// import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/HeroImage.webp'
// import { Appbar } from '../components/Appbar';
// --- Reusable UI Components ---

const HeroSection = () => (
    // Added relative positioning and overflow-hidden for the graphics
    <div className="grid grid-col-1 lg:grid grid-cols-9 mb-10 bg-[#f7f4ed]">
        <div className="flex flex-col justify-center col-span-6 ml-4">
            <div className="flex justify-center pl-4 text-[120px] leading-none text-[#242424] font-semi-bold font-serif ">
                Human <br /> stories & ideas
            </div>
            <div className="flex justify-left pt-10 text-2xl font-arial  pl-11">
                A place to read, write, and deepen your understanding
            </div>
            <div>
                <Link to={"/signin"}>
                <button className="ml-11 mt-10 rounded-3xl px-6 py-2 bg-black text-xl text-white font-semibold hover: bg-[#242424]">
                    Start Reading
                </button>
                </Link>
            </div>
        </div>
        <div className="hidden lg:block col-span-3 ">
            <img src={HeroImage}></img>
        </div>
    </div>
);

const Footer = () => (
    <footer className="border-black border-t bg-[#f7f4ed]">
        <div className="max-w-5xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <p className="text-gray-500">&copy; {new Date().getFullYear()} Harsh All Rights Reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="https://github.com/Harsh-1813" className="text-gray-500 hover:text-gray-900 transition-colors">Github</a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">LinkedIn</a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">RSS</a>
                </div>
            </div>
        </div>
    </footer>
);


// --- Main App Component ---
export const Landing = () => {
    return (
        // The antialiased class smoothens the font for better readability.
        // flex flex-col min-h-screen ensures the footer stays at the bottom.
        <div className=" antialiased flex flex-col bg-[#f7f4ed]">
            {/* <Appbar /> */}
            <main >
                <HeroSection />
            </main>
            <Footer />
        </div>
    );
}
