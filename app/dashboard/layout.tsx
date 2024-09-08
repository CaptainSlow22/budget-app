import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
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
        <div className="fixed block md:hidden ">
          <NavbarMobile />
        </div>
        <div className="md:ml-64">
          {children}
        </div>
      </>
    )
  }