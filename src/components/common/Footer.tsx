"use client";
import {  FaArrowRight } from "react-icons/fa";
import { Input } from "../ui/input";

export default function Footer() {
  return (
    <footer className="bg-white py-6   px-7   rounded-t-[40px]  border-2">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 " >
        
        <div className="w-full">
          <h3 className="font-bold text-lg text-black mb-2">DesignAR</h3>
          <p className="text-sm text-gray-600">
            Stay in the loop and sign up for the Wardiere newsletter:
          </p>
          <div className="relative mt-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mainbackground"
            />
            <div className="absolute inset-y-0 right-1 flex items-center">
              <div className="flex justify-center items-center w-8 h-8 bg-mainbackground text-white rounded-full cursor-pointer">
                <FaArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>

    
        <div className="w-full ">
          <h4 className="font-bold text-lg text-black mb-3">Company</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="hover:text-mainbackground cursor-pointer">Home</li>
            <li className="hover:text-mainbackground cursor-pointer">About</li>
            <li className="hover:text-mainbackground cursor-pointer">Solutions</li>
            <li className="hover:text-mainbackground cursor-pointer">Pricing</li>
            <li className="hover:text-mainbackground cursor-pointer">Team</li>
            <li className="hover:text-mainbackground cursor-pointer">Career</li>


    

          </ul>
        </div>

 
        <div className="w-full">
          <h4 className="font-bold text-lg text-black mb-3">Documentation</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="hover:text-mainbackground cursor-pointer">FAQ</li>
            <li className="hover:text-mainbackground cursor-pointer">API</li>
            <li className="hover:text-mainbackground cursor-pointer">Guides</li>
            <li className="hover:text-mainbackground cursor-pointer">Support</li>
          </ul>
        </div>

    

        <div className="w-full">
          <h4 className="font-bold text-lg text-black mb-3">Social</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="hover:text-mainbackground cursor-pointer">Facebook</li>
            <li className="hover:text-mainbackground cursor-pointer">Instagram</li>
            <li className="hover:text-mainbackground cursor-pointer">YouTube</li>
            <li className="hover:text-mainbackground cursor-pointer">Twitter</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        © Wardiere Inc. All Rights Reserved 2025 | Terms & Conditions
      </div>
    </footer>
  );
}

