"use client";
import React from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Content from './content'

function page() {
  return (
    <div className='w-full min-h-screen text-white ' style={{ backgroundColor: "#E5F4DD" }}> 
    <Navbar/>
    <Content/>
    <Footer/>
    </div>
  )
}

export default page
