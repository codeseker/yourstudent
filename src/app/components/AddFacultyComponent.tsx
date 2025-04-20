"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Loader from "@/app/components/Loader";

const AddFacultyComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isOtpSending, setIsOtpSending] = useState<boolean>(false);
  const [isOtpVerifying, setIsOtpVerifying] = useState<boolean>(false);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setIsOtpSending(true);
    try {
      await axios.post("/api/v1/send-otp", { email });
      toast.success("OTP sent successfully");
      setIsDialogOpen(true);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      console.error("Error sending OTP:", error);
    } finally {
      setIsOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setIsOtpVerifying(true);
    try {
      const { data }: { data: { success: boolean; message: string } } =
        await axios.post("/api/v1/verify-otp", { otp, email});

      if (data.success) {
        toast.success("OTP verified successfully");
        setIsDialogOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
      console.error("Error verifying OTP:", error);
    } finally {
      setIsOtpVerifying(false);
    }
  };

  return (
    <div className="bg-card w-full rounded-xl shadow-xl p-8">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
        Add Teacher
      </h1>

      <div className="p-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Email
        </label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="w-full mb-3"
        />
        <Button
          onClick={handleSendOtp}
          className="w-full flex justify-center items-center"
          disabled={isOtpSending}
        >
          {isOtpSending ? <Loader /> : "Send OTP"}
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full mb-3"
            />
            <Button
              onClick={handleVerifyOtp}
              className="w-full flex justify-center items-center"
              disabled={isOtpVerifying}
            >
              {isOtpVerifying ? <Loader /> : "Verify OTP"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFacultyComponent;
