"use client"
import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';

interface Expense {
    _id: string;
    name: string;
    amount: number;
    createdAt: Date;
}

const ExpensesPage = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const {toast} = useToast();

    useEffect(() => {
        if (!userId) return;
        
        const fetchExpenses = async () => {
            try {
                const res = await fetch(`/api/get/getExpenses?userId=${userId}`);
                if (!res.ok) {
                    throw new Error("Network response error");
                }
                const data = await res.json();
                const exp: Expense[] = data.expenses;
                setExpenses(exp.reverse());  
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [userId]);

    const handleDelete = async (expenseId: string) => {
        try {
            const res = await fetch(`/api/delete/deleteExpense/${expenseId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast({description: "Expense deleted"});
                setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== expenseId));
            } else {
                console.log("Failed to delete expense");
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return <div className='h-screen flex items-center justify-center'><Loader className="text-blue-800" size={64}/></div>;

    return (
        <div className="p-4">
            <h1 className="font-bold text-4xl">Your Expenses</h1>
            <div className="mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenses.map((expense) => (
                            <TableRow key={expense._id}>
                                <TableCell className="font-bold">{expense.name}</TableCell>
                                <TableCell className="font-bold">{expense.amount}$</TableCell>
                                <TableCell className="font-bold">{new Date(expense.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="font-bold text-red-600">
                                    <button onClick={() => handleDelete(expense._id)}>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ExpensesPage;
