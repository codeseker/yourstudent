import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";
import { otpCache } from '@/app/lib/cache';

let pass = process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD
  ?.split(";")[0]
  .replace(/"/g, "")
  .trim();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
    pass: pass
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
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Your OTP for Teacher Registration',
      text: `Your OTP is: ${otp}`, // Send plain OTP for email
    });

    return NextResponse.json({ msg: `Otp Sent Successfully`, success: true });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ success: false, message: 'Error sending OTP' });
  }
}
