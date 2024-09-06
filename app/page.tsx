import Image from "next/image";
import Spline from '@splinetool/react-spline/next';
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-300 to-slate-400 min-h-screen flex flex-col">
      <div className="p-4 md:p-6 bg-white shadow-lg">
        <h1 className="text-blue-600 font-black text-xl">BudgetWise</h1>
      </div>
      <div className="flex-1 p-16">
        <div className="mt-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-center">Power Up Your Savings, One Tap at a Time</h1>
          <button className="mt-16 rounded-3xl px-4 py-2 text-2xl font-bold text-white bg-blue-700 hover:scale-105"><Link href={"/login"}>Get Started</Link></button>
        </div>
        <div className="flex justify-center items-center">
          <div className="hidden lg:block lg:mt-20">
            <Spline
              scene="https://prod.spline.design/qr-r8HIhRfnv0NAG/scene.splinecode" 
            />
          </div>
          <div>
            <p className="text-md mt-20 lg:mt-0 md:text-2xl text-gray-800 font-black">
              Track your daily, weekly, and monthly transactions with detailed breakdowns, helping you visualize where your money is going.<br /><br />
              Create custom categories for expenses like groceries, utilities, entertainment, and more. You can set spending limits for each category.<br /><br />
              Access your budget from any device—desktop, tablet, or mobile. Sync your data in real-time across platforms.
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-white shadow-inner p-6">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="#" className="text-gray-600 hover:text-blue-700">About</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-700">Services</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-700">Contact</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-700">Privacy Policy</Link>
          </div>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-600 hover:text-blue-700"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-600 hover:text-blue-700"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-600 hover:text-blue-700"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} BudgetWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
