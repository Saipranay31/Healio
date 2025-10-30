"use client";

import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Marquee from './components/Marquee'
import About from './components/About'
import Eyes from './components/Eyes'
import Featured from './components/Featured'
import Footer from './components/Footer'
import Steps from './components/Steps';

const page = () => {
  useEffect(()=>{
    {
      async() =>{
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = LocomotiveScroll();
      }
    }

  },[])

  return (
    
    <div className='w-full min-h-screen text-white ' style={{ backgroundColor: "#E5F4DD" }}> 
      <Navbar/>
      <LandingPage/>
      <Marquee/>
      <About/>
      <Eyes/>
      <Featured/>
      <Steps/>
      <Footer/>
    </div>
  )
}

export default page
