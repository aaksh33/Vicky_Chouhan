'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { getCookieConsent } from '@/lib/cookies';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent) {
      const timer = setTimeout(() => {
        setShow(true);
        setTimeout(() => setIsVisible(true), 50);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const setCookie = (value: string) => {
    document.cookie = `cookieConsent=${value}; max-age=${31536000}; path=/; SameSite=Lax`;
    setIsVisible(false);
    setTimeout(() => setShow(false), 400);
  };

  if (!show) return null;

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
        <div className={`bg-white w-full p-6 shadow-2xl rounded-t-2xl transition-transform duration-400 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="max-w-6xl mx-auto flex flex-col gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Can we store cookies?</h3>
              <p className="text-sm text-gray-600">
                We store your data locally on your device, not on our servers, to provide a better user experience. 
                This helps us remember your preferences and improve site performance. 
                Learn more in our{' '}
                <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
                {' '}and{' '}
                <a href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a>.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => setCookie('rejected')}
                className="flex-1 px-6 py-2.5 bg-white text-black border border-gray-300 rounded-sm hover:bg-gray-50 font-medium"
              >
                Reject
              </Button>
              <Button
                onClick={() => setCookie('accepted')}
                className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-sm hover:bg-blue-700 font-medium"
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className={`hidden md:block fixed bottom-2 left-2 xl:bottom-4 xl:left-4 z-50 transition-all duration-400 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}>
        <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">Can we store cookies?</h3>
          <p className="text-sm text-gray-600 mb-4">
            We store your data locally on your device, not on our servers, to provide a better user experience. 
            This helps us remember your preferences and improve site performance. 
            Learn more in our{' '}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
            {' '}and{' '}
            <a href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a>.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => setCookie('rejected')}
              className="flex-1 px-4 py-2 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
            >
              Reject
            </Button>
            <Button
              onClick={() => setCookie('accepted')}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
