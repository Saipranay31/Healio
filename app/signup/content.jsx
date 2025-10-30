"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState,useEffect } from 'react'
import app from '@/app/firebaseconfig'


const Content = () => {

  const [user, setUser] = useState(null)
  const router=useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const auth=getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      if(user){
        setUser(user);
      }
      else{
        setUser(null);
      }
    });

    return ()=>unsubscribe();
  }},[]);

  const signInWithGoogle = async () => {
    const auth=getAuth(app);
    const provider = new GoogleAuthProvider();
    try{
      const result = await signInWithPopup(auth,provider);
      console.log("User signed in:",result.user);
      router.push('/home');
    }
    catch(error){
      console.log("Error signing in with Google",error.message);
    }
  };

  const pushhome = ()=>{
    try{
      router.push('/');
    }
    catch(error){
      console.log("Error pushing to home",error.message);
    }
    
  }

  return (
    <div className="w-full">
      {/* Empty div to push content down */}
      <div className="h-[20px]"></div> {/* Adjust the height as needed */}
      {/* Main content: Centered and with image on left, text on right */}
      <div className="flex justify-center items-center w-full py-20">
        <div className="w-full max-w-5xl flex justify-between items-center gap-10 bg-[#F5FFEF] border-4 border-[#A9C89A] rounded-3xl p-10">
          {/* Left side: Image */}
          <div className="w-1/2">
            <img
              src="/images/signup.png" // Change the image source as needed
              alt="Signup"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Right side: Text and Button */}
          <div className="w-1/2 text-center font-montreal">
            {" "}
            {/* Updated to 'text-center' */}
            <h1 className="text-4xl font-bold text-[#688A57]">
              Welcome Back to Peace and Positivity
            </h1>
            <p className="mt-4 text-xl text-[#303D29]">
              Log in to continue your journey towards better mental well-being.
              Your safe space is just a step away.
            </p>
            {/* Sign Up with Google Button */}
            <Button
              onClick={signInWithGoogle}
              variant="outline"
              className="text-[#688A57] text-xl font-bold px-20 py-6 mt-20 border-[#89AE76]"
            >
              <svg
                width="294"
                height="300"
                viewBox="0 0 294 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M150 122.729V180.82H230.727C227.183 199.502 216.545 215.321 200.59 225.957L249.272 263.731C277.636 237.55 294 199.094 294 153.412C294 142.776 293.046 132.548 291.273 122.73L150 122.729Z"
                  fill="#4285F4"
                />
                <path
                  d="M65.9342 178.553L54.9546 186.958L16.0898 217.23C40.7719 266.185 91.3596 300.004 149.996 300.004C190.496 300.004 224.45 286.64 249.269 263.731L200.587 225.958C187.223 234.958 170.177 240.413 149.996 240.413C110.996 240.413 77.8602 214.095 65.9955 178.639L65.9342 178.553Z"
                  fill="#34A853"
                />
                <path
                  d="M16.0899 82.7734C5.86309 102.955 0 125.728 0 150.001C0 174.273 5.86309 197.047 16.0899 217.228C16.0899 217.363 66.0004 178.5 66.0004 178.5C63.0004 169.5 61.2272 159.955 61.2272 149.999C61.2272 140.043 63.0004 130.498 66.0004 121.498L16.0899 82.7734Z"
                  fill="#FBBC05"
                />
                <path
                  d="M149.999 59.7279C172.091 59.7279 191.727 67.3642 207.409 82.0918L250.364 39.1373C224.318 14.8647 190.5 0 149.999 0C91.3627 0 40.7719 33.6821 16.0898 82.7738L65.9988 121.502C77.8619 86.0462 110.999 59.7279 149.999 59.7279Z"
                  fill="#EA4335"
                />
              </svg>
              Sign Up/Sign In With Google
            </Button>


            <Button
            onClick={pushhome}
              variant="outline"
              className="text-[#688A57] text-xl font-bold px-20 py-6 mt-5 border-[#89AE76]"
            > Back to Home<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
