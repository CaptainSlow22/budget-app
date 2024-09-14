"use client"
import React, { useEffect, useState } from 'react'
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
import { useSession } from 'next-auth/react';
import IncomeCard from '@/components/IncomeCard';
import { useToast } from '@/hooks/use-toast';

interface Income {
  _id: string,
  name: string,
  amount: number,
  icon: string
}

const IncomesPage = () => {
   const [icon, setIcon] = useState("😊");
   const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
   const [name, setName] = useState("");
   const [amount, setAmount] = useState("");
   const [error, setError] = useState("");
   const {data : session} = useSession();
   const [incomes, setIncomes] = useState<Income[]>([]);
   const userId = session?.user?.id;
   const {toast} = useToast();

   const fetchIncomes = async () => {
    try {
      const res = await fetch(`/api/get/getIncomes/${userId}`);
      if(!res.ok) {
        throw new Error("Network response error");
      }
      const data = await res.json();
      const inc: Income[] = data.incomes;
      setIncomes(inc.reverse());
    } catch(error) {
      console.log(error);
    }
  }

   const createIncome = async () => {
      
    if(!userId || !name || !amount) {
      setError("All fields are necessary");
      return;
    }
    try {
      const res = await fetch(`/api/post/addIncome`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name,
          amount,
          icon
        })
      })
      if(res.ok) {
        fetchIncomes();
      }
    } catch(error) {
      console.log(error)
    }
 }

 const deleteIncome = async (incomeId: string) => {
    try {
      const res = await fetch(`/api/delete/deleteIncome/${incomeId}`, {
        method: "DELETE"
      });

      if(res.ok) {
        toast({description: "Income deleted"})
        setIncomes((prevIncomes) => prevIncomes.filter((income) => income._id != incomeId))
      } else {
        console.log("Failed to delete income");
      }

    } catch(error) {
      console.log(error);
    }
 }

 useEffect(() => {
    fetchIncomes();
   },[userId])


   if (error) return <div>Error: {error}</div>;

  return (
    <div className='p-4'>
        <h1 className='font-bold text-4xl'>Your Incomes</h1>
        <div className='mt-8 flex flex-col space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4'>
            <Dialog>
              <DialogTrigger asChild>
                <div className='border py-12 rounded-2xl bg-gray-50 hover:bg-gray-100 flex flex-col justify-center items-center shadow-md'>
                    <span className='text-4xl'>+</span>
                    <p className='font-bold text-xl text-center'>Create New Income</p>
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
                      <h2 className="text-black font-medium my-1">Income Name</h2>
                      <Input
                        placeholder="e.g. Job Salary"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      <h2 className="text-black font-medium my-1">Income Amount</h2>
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
                      onClick={() => createIncome()}
                      className="mt-5 w-full rounded-full"
                    >
                      Create Budget
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {incomes.map((income) => (
              <IncomeCard key={income._id} icon={income.icon} name={income.name} amount={income.amount} onDelete={() => deleteIncome(income._id)}/>

            ))}
        </div>
    </div>
  )
}

export default IncomesPage