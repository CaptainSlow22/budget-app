"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import BudgetCard from "@/components/BudgetCard";
import Link from "next/link";

interface Budget {
  _id: string;
  name: string;
  amount: number;
  icon: string;
}

const BudgetsPage = () => {
  const [icon, setIcon] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const userId = session?.user?.id;

  const fetchBudgets = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`/api/get/getBudgets?userId=${userId}`);
      if (!res.ok) {
        throw new Error("Network response error");
      }
      const data = await res.json();
      const budg: Budget[] = data.budgets;
      setBudgets(budg.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const createBudget = async () => {
    if (!userId || !name || !amount) {
      setError("All fields are necessary");
      return;
    }
    try {
      const res = await fetch(`/api/post/addBudget`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name,
          amount,
          icon,
        }),
      });

      if (res.ok) {
        fetchBudgets();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [userId]);

  return (
    <div className="p-4">
      <h1 className="font-bold text-4xl">Your Budgets</h1>
      <div className="mt-8 flex flex-col space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <div className="border py-12 rounded-2xl bg-gray-50 hover:bg-gray-100 flex flex-col justify-center items-center shadow-md">
              <span className="text-4xl">+</span>
              <p className="font-bold text-xl text-center">Create New Budget</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
              <DialogDescription>
                <div className="mt-5">
                  <Button
                    variant="outline"
                    className="text-lg"
                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  >
                    {icon}
                  </Button>
                  <div className="absolute z-20">
                    <EmojiPicker
                      open={openEmojiPicker}
                      onEmojiClick={(e) => {
                        setIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <h2 className="text-black font-medium my-1">Budget Name</h2>
                    <Input
                      placeholder="e.g. Home Decor"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <h2 className="text-black font-medium my-1">Budget Amount</h2>
                    <Input
                      type="number"
                      placeholder="e.g. 5000$"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  disabled={!(name && amount)}
                  onClick={() => createBudget()}
                  className="mt-5 w-full rounded-full"
                >
                  Create Budget
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {budgets.map((budget) => (
          <Link href={`/dashboard/budgets/${budget._id}`} key={budget._id}>
            <BudgetCard _id={budget._id} icon={budget.icon} name={budget.name} amount={budget.amount} expenseAdded />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BudgetsPage;
