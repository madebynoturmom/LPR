import 'dotenv/config';
import { sendEmail } from '../src/lib/server/email.js';

async function testEmail() {
  try {
    const testOtp = '123456';
    await sendEmail('pkartikean@gmail.com', 'Test OTP for LPR App', `Your test OTP is: ${testOtp}. This is a test to verify email functionality.`);
    console.log('✅ Test email sent successfully to pkartikean@gmail.com!');
  } catch (error) {
    console.error('❌ Email sending failed:', error);
  }
}

testEmail();