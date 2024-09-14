"use client";
import BudgetCard from '@/components/BudgetCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Budget {
  _id: string;
  name: string;
  amount: number;
  icon: string;
}

const BudgetItem = ({ params }: { params: { id: string } }) => {
  const { id } = params; 
  const [budget, setBudget] = useState<Budget | null>(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [expenseAdded, setExpenseAdded] = useState(false); 

  const router = useRouter();

  const createExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!name || !amount) {
        setError("All fields are necessary.");
        return;
    }

    try {
        const res = await fetch(`/api/post/addExpense`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                budgetId: id,
                name,
                amount,
            }),
        });
        if (res.ok) {
            const form = e.target as HTMLFormElement;
            form.reset();
            toast({ description: "Expense added" });
            setExpenseAdded(!expenseAdded);  
        } else {
            console.log("Add Expense failed.");
        }
    } catch(error) {
        console.log(error);
    }
  }

  const editBudget = async (newAmount: string) => {
    try {
      const res = await fetch(`/api/put/updateBudget/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: newAmount }),
      });

      if (!res.ok) {
        throw new Error('Failed to update budget');
      }

      const updatedBudget = await res.json();
      setBudget(updatedBudget);
      router.refresh();
      toast({ description: "Budget edited" });
    } catch(error) {
      console.log(error);
    }
  }

  const deleteBudget = async () => {
    try {
        const res = await fetch(`/api/delete/deleteBudget/${id}`, {
            method: "DELETE"
        });

        if(res.ok) {
            router.push("/dashboard/budgets");
            toast({ description: "Budget deleted" });
        } else {
            console.log("Failed to delete budget");
        }

    } catch(error) {
        console.log(error);
    }
  }

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await fetch(`/api/get/getBudgets?id=${id}`); 
        if (!res.ok) {
          throw new Error('Network response error');
        }
        const data = await res.json();
        setBudget(data.budget);
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };

    fetchBudget();
  }, [id]);


  if (!budget) {
    return <div>Loading...</div>;
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className='font-bold text-4xl'>Add Expenses</h1>
      <div className='p-4 flex justify-center lg:justify-end space-x-4'>
        <Dialog>
            <DialogTrigger asChild>
              <div className='mt-4 bg-blue-600 px-4 py-2 text-white font-bold rounded-full inline-block hover:bg-blue-400'>Edit</div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Budget Amount</DialogTitle>
                <DialogDescription>
                  <div className="mt-2">
                    <h2 className="text-black font-medium my-1">Amount</h2>
                    <Input
                      placeholder="e.g. 5000$"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    disabled={!amount}
                    onClick={() => editBudget(amount)}
                    className="mt-5 w-full rounded-full"
                  >
                    Edit Budget
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
        </Dialog>
        <div className='flex mt-4 justify-center'>
          <button onClick={deleteBudget} className='px-4 py-2 font-bold bg-red-600 text-white rounded-full hover:bg-red-400'>Delete</button>
        </div>
      </div>
      <div className='mt-4 p-4 flex flex-col space-y-8 lg:space-y-0 lg:flex-row lg:space-x-8'>
        <div className='w-full lg:w-1/2'>
            <BudgetCard _id={id} icon={budget.icon} name={budget.name} amount={budget.amount} expenseAdded={expenseAdded} />
        </div>
        <div className='w-full lg:w-1/2'>
            <form onSubmit={createExpense} className="bg-gray-100 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                </label>
                <Input
                    placeholder="e.g. Home Decor"
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Amount
                </label>
                <Input
                    type="number"
                    placeholder="e.g. 5000$"
                    onChange={(e) => setAmount(e.target.value)}
                />
                </div>
                <div className="flex items-center justify-between">
                <Button
                    disabled={!(name && amount)}
                    className="mt-5 w-full rounded-full"
                >
                    Create Expense
                </Button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
