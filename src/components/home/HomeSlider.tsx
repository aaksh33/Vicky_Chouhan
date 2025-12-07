"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";

const HeaderSlider = () => {
  const [sliderData, setSliderData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.slider) setSliderData(data.slider);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  useEffect(() => {
    if (sliderData.length === 0 || isHovered) return;
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length, isHovered, goToNext]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(sliderData.length);
    } else if (currentIndex === sliderData.length + 1) {
      setCurrentIndex(1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToNext() : goToPrev();
    }
  };

  if (loading) {
    return (
      <div className="overflow-hidden relative w-full">
        <div className="relative px-1 sm:py-16 md:py-20 sm:px-8 md:px-12 mt-0 sm:mt-5 lg:mt-10 md:!min-h-[350px] lg:!min-h-[400px] bg-gray-200 animate-pulse flex items-center sm:rounded-lg" style={{ height: "240px" }}>
          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
            <div className="h-4 sm:h-5 bg-gray-300 rounded w-32 sm:w-48"></div>
            <div className="space-y-2">
              <div className="h-6 sm:h-8 md:h-10 bg-gray-300 rounded w-full max-w-md"></div>
              <div className="h-6 sm:h-8 md:h-10 bg-gray-300 rounded w-3/4"></div>
            </div>
            <div className="flex gap-2 sm:gap-3 pt-2">
              <div className="h-9 sm:h-10 bg-gray-300 rounded-full w-24 sm:w-32"></div>
              <div className="h-9 sm:h-10 bg-gray-300 rounded-full w-24 sm:w-32"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 my-3 sm:my-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-gray-300"></div>
          ))}
        </div>
      </div>
    );
  }

  if (sliderData.length === 0) return null;

  const slides = [sliderData[sliderData.length - 1], ...sliderData, sliderData[0]];
  const realIndex = currentIndex === 0 ? sliderData.length - 1 : currentIndex === sliderData.length + 1 ? 0 : currentIndex - 1;

  return (
    <div 
      className="overflow-hidden relative w-full group" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={sliderRef}
        className="flex"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full flex-shrink-0">
            <Link href={slide.link || "/products"} className="block">
              <div className="relative px-1 sm:py-16 md:py-20 sm:px-8 md:px-12 mt-0 sm:mt-5 lg:mt-10 md:!min-h-[350px] lg:!min-h-[400px] flex items-center sm:rounded-lg overflow-hidden" style={{ minHeight: "240px", backgroundColor: "#E6E9F2" }}>
                {slide.image && (
                  <Image
                    src={slide.image}
                    alt={slide.title || ""}
                    fill
                    priority={index === 1}
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/10 to-transparent z-[1]"></div>
                <div className="relative z-10 max-w-xl text-white px-4 sm:px-0">
                  <p className="text-[10px] sm:text-sm text-orange-400 pb-1 sm:pb-2 font-bold uppercase tracking-wide">
                    {slide.offer}
                  </p>
                  <h1 className="text-base sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-5 leading-tight">
                    {slide.title}
                  </h1>
                  <div className="flex flex-row items-center gap-2 sm:gap-3">
                    <div className="text-[10px] sm:text-sm px-3 text-center sm:px-8 py-1.5 sm:py-2.5 bg-orange-600 hover:bg-orange-700 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                      {slide.buttonText1}
                    </div>
                    <div className="group flex items-center gap-1 text-center sm:gap-1.5 text-[10px] sm:text-sm px-3 sm:px-7 py-1.5 sm:py-2.5 font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white rounded-full transition-all">
                      {slide.buttonText2}
                      <span className="group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrev}
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
      </button>

      <div className="flex items-center justify-center gap-2 my-3 sm:my-4">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index + 1);
              }
            }}
            className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all ${
              realIndex === index ? "bg-orange-600 w-6 sm:w-8" : "bg-gray-400 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
