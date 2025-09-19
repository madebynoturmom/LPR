import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { guestPass } from '$lib/server/db/schema';
import { v4 as uuidv4 } from 'uuid';

export const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const plateNumber = formData.get('plateNumber')?.toString();
    const durationMinutes = parseInt(formData.get('durationMinutes')?.toString() || '0', 10);

    if (!plateNumber || isNaN(durationMinutes) || durationMinutes <= 0) {
      return json({ success: false, error: 'Invalid input data' }, { status: 400 });
    }

    await db.insert(guestPass).values({
      id: uuidv4(),
      plateNumber,
      durationMinutes,
      visitTime: new Date(),
      type: 'food_delivery'
    });

    return json({ success: true });
  } catch (error) {
    console.error('Error creating food delivery pass:', error);
    return json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
};