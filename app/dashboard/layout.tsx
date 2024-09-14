import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
      <>
        <div className="fixed md:w-64 hidden md:block ">
          <Navbar />
        </div>
        <div className="absolute block md:hidden ">
          <NavbarMobile />
        </div>
        <div className="mb-16 md:mb-0 md:ml-64">
          {children}
          <Toaster/>
        </div>
      </>
    )
  }