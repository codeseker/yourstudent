"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

function UploadBatch() {
  const [batchName, setBatchName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleBatchNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBatchName(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (batchName && file) {
      console.log("Batch Name:", batchName);
      console.log("Selected File:", file);
    } else {
      alert("Please provide a batch name and upload a file.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Upload Batch Data
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Batch Name:
          </label>
          <input
            type="text"
            value={batchName}
            onChange={handleBatchNameChange}
            placeholder="Enter Batch Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Upload File:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UploadBatch;
