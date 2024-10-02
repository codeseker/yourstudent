"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, ChangeEvent, FormEvent } from "react";

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (batchYear && sectionName && file) {
      setIsSubmitting(true);
      console.log("Batch Year:", batchYear);
      console.log("Section Name:", sectionName);
      console.log("Selected File:", file);

      setTimeout(() => {
        setIsSubmitting(false);
        setBatchYear("");
        setSectionName("");
        setFile(null);
        alert("Batch data uploaded successfully!");
      }, 1000);
    } else {
      alert("Please provide all required fields.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Upload Batch Data
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block  font-medium mb-2">Batch Year:</label>
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
          <label className="block  font-medium mb-2">Upload File:</label>
          <Input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full py-2 px-4 font-semibold rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default UploadBatch;
