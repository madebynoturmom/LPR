import nodemailer from 'nodemailer';

// Configure these with your email provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  // Additional options for Gmail
  tls: {
    rejectUnauthorized: false
  }
});

// Test connection on startup
console.log('🔧 Initializing Gmail SMTP transporter...');
console.log('📧 SMTP User configured:', process.env.SMTP_USER ? 'YES' : 'NO');
console.log('🔑 SMTP Password configured:', process.env.SMTP_PASS ? 'YES' : 'NO');

export async function sendEmail(to: string, subject: string, text: string) {
  console.log('📤 ===== EMAIL SEND ATTEMPT =====');
  console.log('📧 To:', to);
  console.log('📄 Subject:', subject);
  console.log('📝 Content length:', text.length, 'characters');

  // Verify SMTP configuration
  console.log('🔧 SMTP Config Check:');
  console.log('  - Service: Gmail');
  console.log('  - User:', process.env.SMTP_USER ? `${process.env.SMTP_USER.substring(0, 3)}***@***.com` : 'NOT SET');
  console.log('  - Password:', process.env.SMTP_PASS ? '***SET***' : 'NOT SET');

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text
  };

  console.log('📋 Mail options prepared:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    hasText: !!mailOptions.text
  });

  try {
    console.log('🚀 Attempting to send email via Gmail SMTP...');

    // Test connection first
    console.log('🔌 Testing SMTP connection...');
    const connectionTest = await transporter.verify();
    console.log('✅ SMTP connection test:', connectionTest ? 'SUCCESS' : 'FAILED');

    if (!connectionTest) {
      throw new Error('SMTP connection verification failed');
    }

    const result = await transporter.sendMail(mailOptions);

    console.log('✅ ===== EMAIL SENT SUCCESSFULLY =====');
    console.log('📨 Message ID:', result.messageId);
    console.log('🔄 Response:', result.response);
    console.log('📮 Accepted recipients:', result.accepted);
    console.log('❌ Rejected recipients:', result.rejected);

    return result;

  } catch (error: any) {
    console.error('❌ ===== EMAIL SEND FAILED =====');
    console.error('🔴 Error type:', error.constructor.name);
    console.error('🔴 Error message:', error.message);
    console.error('🔴 Error code:', error.code);

    // Gmail-specific error handling
    if (error.code === 'EAUTH') {
      console.error('🔐 AUTHENTICATION ERROR: Check your Gmail credentials');
      console.error('💡 Gmail tips:');
      console.error('   - Use App Password instead of regular password');
      console.error('   - Enable 2FA on your Google account');
      console.error('   - Generate App Password: https://support.google.com/accounts/answer/185833');
    } else if (error.code === 'ENOTFOUND') {
      console.error('🌐 NETWORK ERROR: Cannot connect to Gmail SMTP servers');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('🚫 CONNECTION REFUSED: Gmail SMTP server rejected connection');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('⏰ TIMEOUT ERROR: Connection to Gmail SMTP timed out');
    }

    // Log full error details for debugging
    console.error('🔍 Full error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });

    throw error;
  }
}
