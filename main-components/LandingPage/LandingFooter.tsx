import React from 'react';
import Image from 'next/image';

export default function LandingFooter() {
  return (
    <footer className="bg-landing text-gray-100">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="border-t w-full border-gray-700"></div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-white">
              <Image src={`/wma-logo-2.svg`} alt="logo" width={100} height={100} className="w-20"/>
            </div>

            <p className="mt-4 max-w-xs text-gray-300">
              SMRS is the most efficient platform for managing school records, communication, and performance tracking in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
           

            <div>
              <p className="font-medium text-white">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="text-gray-400 transition hover:opacity-75">About</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition hover:opacity-75">Meet the Team</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition hover:opacity-75">Careers</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="text-gray-400 transition hover:opacity-75">Contact</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition hover:opacity-75">FAQs</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition hover:opacity-75">Live Chat</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="text-gray-400 transition hover:opacity-75">Accessibility</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition hover:opacity-75">Returns Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition hover:opacity-75">Refund Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition hover:opacity-75">Hiring Statistics</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">&copy; {`${new Date().getFullYear()}`} SMRS. All rights reserved.</p>
      </div>
    </footer>
  );
}
