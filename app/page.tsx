import Spline from '@splinetool/react-spline/next';
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-700 to-black min-h-screen flex flex-col">
      <div className="p-4 md:p-6 bg-gray-800 shadow-lg">
        <h1 className="text-white font-black text-xl">BudgetWise</h1>
      </div>
      <div className="flex-1 p-16">
        <div className="mt-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-center text-gray-100">Power Up Your Savings, One Tap at a Time</h1>
          <button className="mt-16 rounded-full px-4 md:px-6 py-2 md:py-3 text-2xl font-bold text-white bg-blue-700 hover:scale-105"><Link href={"/login"}>Get Started</Link></button>
        </div>
        <div className="flex flex-col lg:flex-row lg:-mt-20 justify-center items-center">
          <div className="block md:hidden">
            <Spline
              scene="https://draft.spline.design/TJ-ZHPDT8cRgS8CP/scene.splinecode"
            />
          </div>
          <div className="hidden md:block">
            <Spline
              scene="https://draft.spline.design/0XQOEROgH7Nu3DoO/scene.splinecode"
            />
          </div>
          <div>
            <p className="text-md mt-20 lg:mt-0 md:text-2xl text-gray-200 font-black">
              Track your daily, weekly, and monthly transactions with detailed breakdowns, helping you visualize where your money is going.<br /><br />
              Create custom categories for expenses like groceries, utilities, entertainment, and more. You can set spending limits for each category.<br /><br />
              Access your budget from any device—desktop, tablet, or mobile. Sync your data in real-time across platforms.
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-gray-950 p-6">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="#" className="text-white hover:text-blue-400">About</Link>
            <Link href="#" className="text-white hover:text-blue-400">Services</Link>
            <Link href="#" className="text-white hover:text-blue-400">Contact</Link>
            <Link href="#" className="text-white hover:text-blue-400">Privacy Policy</Link>
          </div>
          <p className="text-white text-sm">&copy; {new Date().getFullYear()} BudgetWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
