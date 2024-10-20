"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "axios"; // Import AxiosError
import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";

interface DocumentResponse {
  success: boolean;
  message: string;
}

function UploadBatch() {
  const [batchYear, setBatchYear] = useState<string>("");
  const [sectionName, setSectionName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleBatchYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBatchYear(event.target.value);
  };

  const handleSectionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSectionName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (batchYear && sectionName && file) {
      const formData: FormData = new FormData();

      formData.append("batch", batchYear);
      formData.append("section", sectionName);
      formData.append("file", file);

      setIsSubmitting(true);

      try {
        const { data }: { data: DocumentResponse } = await axios.post(
          "/api/v1/admin/upload",
          formData
        );

        if (!data.success) {
          toast(data.message);
          setIsSubmitting(false);
          return;
        }

        toast(data.message);
        setBatchYear("");
        setSectionName("");
        setFile(null);
      } catch (error: unknown) {
        // Use unknown instead of any
        if (axios.isAxiosError(error)) {
          // If it's an Axios error, we can access the response data
          toast(
            error.response?.data?.message || "Error occurred while uploading."
          );
        } else {
          // Handle unexpected errors
          toast("Error occurred while uploading.");
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please provide all required fields.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Upload Batch Data
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Batch Year:</label>
          <Input
            type="text"
            value={batchYear}
            onChange={handleBatchYearChange}
            placeholder="Enter Batch Year"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-2">
            Section Name:{" "}
            <span className="text-gray-700">Just Write A instead CS-A</span>
          </label>
          <Input
            type="text"
            value={sectionName}
            onChange={handleSectionNameChange}
            placeholder="Enter Section Name"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Upload File:</label>
          <Input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full py-2 px-4 font-semibold rounded-md mt-4 flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            "Upload"
          )}
        </Button>
      </form>

      <Separator className="my-4" />
      <div className="flex justify-center items-center">
        <Button>
          <a href={"/assets/dummydata.xlsx"} download={"dummydata.xlsx"}>
            Download Sample Excel
          </a>
        </Button>
      </div>
    </div>
  );
}

export default UploadBatch;
