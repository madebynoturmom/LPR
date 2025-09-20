import { db } from '../src/lib/server/db';
import { guestPass } from '../src/lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';

async function expireGuestPasses() {
  console.log('Starting guest pass expiration process...');

  // Get all active passes and check which ones have expired
  const allActivePasses = await db.select().from(guestPass).where(eq(guestPass.status, 'active'));
  
  const now = Math.floor(Date.now() / 1000);
  let expiredCount = 0;
  
  for (const pass of allActivePasses) {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1000);
    const expirationTime = visitTimeSeconds + (pass.durationMinutes * 60);
    
    if (now >= expirationTime) {
      await db.update(guestPass)
        .set({ status: 'expired' })
        .where(eq(guestPass.id, pass.id));
      expiredCount++;
    }
  }

  console.log(`Expired ${expiredCount} guest passes.`);
}

expireGuestPasses().catch(console.error);