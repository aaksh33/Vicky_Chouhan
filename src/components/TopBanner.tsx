"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { X, Package } from "lucide-react";

export default function TopBanner({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-b-lg sm:-mb-2 p-4 shadow-md transition-all duration-500 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Package className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            We accept bulk orders with special wholesale pricing.{' '}
            <Link href="/contact" className="underline font-semibold hover:text-blue-100">
              Contact us
            </Link>
          </p>
        </div>
        <button
          onClick={handleClose}
          aria-label="Close"
          className="hover:bg-white/20 rounded-full p-1 transition-colors hover:cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
