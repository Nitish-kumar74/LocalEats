// Updated forgot-password.js with better security
import { createTransport } from 'nodemailer';
import { createResetToken, storeResetToken } from '@/lib/auth'; // Should store token in DB
import { getUserByEmail } from '@/lib/users';
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await limiter.check(res, 3, 'FORGOT_PASSWORD_LIMIT_KEY'); // 3 requests per minute
  } catch {
    return res.status(429).json({ message: 'Too many requests' });
  }

  const { email } = req.body;

  try {
    // Always return success to prevent email enumeration
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(200).json({ message: 'If an account exists, a reset email has been sent' });
    }

    const resetToken = createResetToken(user.id);
    await storeResetToken(user.id, resetToken); // Store in database with expiration
    
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

    // ... rest of email sending code ...

    return res.status(200).json({ message: 'If an account exists, a reset email has been sent' });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ message: 'Failed to process request' });
  }
}