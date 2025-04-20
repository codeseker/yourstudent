import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';


import { otpCache } from '@/app/lib/cache';
import { storeValidMails } from '@/app/lib/firebaseFunctions';

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({
      success: false,
      message: 'Email and OTP are required',
    });
  }

  try {
    // Retrieve the hashed OTP from cache
    const hashedOtp = otpCache.get(email.trim());


    if (!hashedOtp) {
      return NextResponse.json({ success: false, message: 'Invalid OTP or expired' });
    }

    // Compare the provided OTP with the hashed OTP
    const isMatch = otp === hashedOtp;

    if (isMatch) {
      otpCache.del(email); // Remove OTP after successful verification
      // Add the teacher's email to your database here
      await storeValidMails(email);
      return NextResponse.json({ success: true, message: 'OTP verified successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({
      success: false,
      message: 'Error verifying OTP. Please try again.',
    });
  }
}
