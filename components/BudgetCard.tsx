"use client"
import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"

interface Props {
    _id: string
    icon: string,
    name: string,
    amount: number,
    expenseAdded: boolean
}

interface Expense {
    amount: number
}


const BudgetCard = ({_id, icon, name, amount, expenseAdded}: Props) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        if(!_id) return;
        const fetchExpenses = async () => {
            try {
                const res = await fetch(`/api/get/getExpenses?budgetId=${_id}`);
                if(!res.ok) {
                    throw new Error("Network response error");
                }
                const data = await res.json();
                const exp: Expense[] = data.expenses;
                console.log(exp);
                setExpenses(exp);
            } catch(error) {
                console.log(error);
            }
        }
        fetchExpenses();
    },[_id, expenseAdded])

    const getTotalSpent = (): number => {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
      };
      
    
    const getPercentage = () => {
        return (getTotalSpent() / amount)*100;
    }

  return (
    <div className='p-6 bg-gray-50 h-[165.6px] flex flex-col justify-between rounded-2xl shadow-md'>
        <div className='flex  items-center justify-between'>
            <div className='flex items-center space-x-4'>
                <span className='text-2xl bg-gray-200 p-4 mx-auto rounded-full'>{icon}</span>
                <p className='font-bold text-xl'>{name}</p>
            </div>
            <div>
                <p className='font-bold text-xl'>{amount}$</p>
            </div>
        </div>
        <div className=''>
            <div className='flex justify-between p-2'>
            <span className={`font-bold ${(getTotalSpent() > amount) ? "text-red-600" : "text-gray-400"}`}>{getTotalSpent()}$ spent</span>
            <span className='font-bold text-gray-400'>{amount - getTotalSpent() < 0 ? "You're over budget!" : `${amount - getTotalSpent()}$ remaining`}</span>
            </div>
            <Progress value={getPercentage()} />
        </div>
    </div>
  )
}

export default BudgetCard