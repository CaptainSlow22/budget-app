"use client";
import React, { useEffect } from "react";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  CircleDollarSign,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white flex justify-center p-2 shadow-lg"
      style={{ zIndex: 50 }} // Ensuring the SideNav has a higher z-index
    >
      <div className="flex flex-row gap-3">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex items-center text-gray-500 font-medium p-3 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 ${
                path == menu.path && "text-primary bg-blue-100"
              }`}
            >
              <menu.icon />
            </h2>
          </Link>
        ))}
        <button
          className="text-gray-500 font-medium p-3"
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
        >
          <LogOut />
        </button>
      </div>
    </div>
  );
}

export default SideNav;
