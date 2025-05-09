"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleClick = async () => {
    if (query) {
      router.push(`/teacher/students/${query}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Title Section */}
      <h1 className="text-5xl font-bold text-gray-800 mb-2">Student</h1>
      <h2 className="text-4xl font-semibold text-orange-600 mb-6">
        Information Portal
      </h2>

      {/* Search Bar */}
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-full hover:border-gray-300 focus:outline-none focus:border-red-500 transition-colors"
          placeholder="Search Students..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={handleClick}
          className="text-1xl absolute top-1/2 rounded-2xl px-8 right-4 flex transform -translate-y-1/2"
        >
          Search
        </Button>
      </div>

      {/* Category Section */}
      <section className="pl-40 pt-20 bg-white-100">
        <div className="container mx-auto py-5 px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="container">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                About Us
              </h2>
              <p className="mt-4 text-gray-600 text-lg">
              Poornima Institute of Engineering & Technology, Jaipur (PIET), a premier institution in engineering education, was established in the academic year 2007. It is affiliated to Rajasthan Technical University and approved by AICTE. PIET aims at providing world-class technical and scientific education that can develop a professional outlook in every walk of life and has been ranked 3rd in QIV ranking.
              </p>
              <div className="mt-8">
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Learn more about us
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchComponent;
