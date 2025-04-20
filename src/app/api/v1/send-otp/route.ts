import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';
import { otpCache } from '@/app/lib/cache';


const transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: "2021pietcsayush034@poornima.org",
    pass: "holsoihpretqklvv"
  },
});

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ success: false, message: 'Email is required' });
  }

  // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

  try {
    // Hash the OTP using bcrypt
    
    otpCache.set(email.trim(), otp);
    // Send the OTP via email
    await transporter.sendMail({
      from: "2021pietcsayush034@poornima.org",
      to: email,
      subject: 'Your OTP for Teacher Registration',
      text: `Your OTP is: ${otp}`, // Send plain OTP for email
    });

    return NextResponse.json({ msg: `Otp: ${otp}` ,success: true });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ success: false, message: 'Error sending OTP' });
  }
}
