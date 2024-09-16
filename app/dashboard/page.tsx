"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashboardCard from "@/components/DashboardCard";
import { CircleDollarSign, Loader, PiggyBank, ReceiptText } from "lucide-react";
import { financialAdvice } from "@/lib/financialAdvice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BudgetCard from "@/components/BudgetCard";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Budget {
  _id: string;
  name: string;
  amount: number;
  icon: string;
}

interface Income {
  amount: number;
}

interface Expense {
  _id: string;
  name: string;
  amount: number;
  createdAt: Date;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [advice, setAdvice] = useState<string | null>("");
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingBudgets, setLoadingBudgets] = useState(true);
  const [loadingIncomes, setLoadingIncomes] = useState(true);
  const [loadingExpenses, setLoadingExpenses] = useState(true);

  const fetchBudgets = async (userId: string) => {
    try {
      const res = await fetch(`/api/get/getBudgets?userId=${userId}`);
      if (!res.ok) throw new Error("Network response error");
      const data = await res.json();
      const budg: Budget[] = data.budgets;
      setBudgets(budg.reverse());
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBudgets(false);
    }
  };

  const fetchIncomes = async (userId: string) => {
    try {
      const res = await fetch(`/api/get/getIncomes/${userId}`);
      if (!res.ok) throw new Error("Network response error");
      const data = await res.json();
      const inc: Income[] = data.incomes;
      setIncomes(inc.reverse());
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingIncomes(false); 
    }
  };

  const fetchExpenses = async (userId: string) => {
    try {
      const res = await fetch(`/api/get/getExpenses?userId=${userId}`);
      if (!res.ok) throw new Error("Network response error");
      const data = await res.json();
      const exp: Expense[] = data.expenses;
      setExpenses(exp.reverse());
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingExpenses(false); 
    }
  };

  const fetchUser = async (userId: string) => {
    try {
      const userRes = await fetch(`/api/get/getUserById/${userId}`);
      if (!userRes.ok) throw new Error("Network response error");
      const userData: User = await userRes.json();
      setUser(userData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUser(false);
    }
  };

  const getTotalBudget = (): number => {
    return budgets.reduce((sum, budget) => (sum += budget.amount), 0);
  };

  const getTotalIncome = (): number => {
    return incomes.reduce((sum, income) => (sum += income.amount), 0);
  };

  const getTotalSpent = (): number => {
    return expenses.reduce((sum, expense) => (sum += expense.amount), 0);
  };

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchUser(userId);

        await Promise.all([
          fetchBudgets(userId),
          fetchIncomes(userId),
          fetchExpenses(userId),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const totalBudget = getTotalBudget();
  const totalIncome = getTotalIncome();
  const totalSpent = getTotalSpent();

  const latestExpenses = expenses.slice(0, 5);
  const latestBudgets = budgets.slice(0, 3);

  useEffect(() => {
    const fetchAdvice = async () => {
      if (totalBudget > 0 || totalSpent > 0 || totalIncome > 0) {
        const advice = await financialAdvice({
          totalBudget,
          totalSpent,
          totalIncome,
        });
        setAdvice(advice);
      }
    };

    fetchAdvice();
  }, [totalBudget, totalSpent, totalIncome]);

  if (
    loadingUser || 
    loadingBudgets || 
    loadingIncomes || 
    loadingExpenses || 
    loading
  ) {
    return <div className="h-screen flex items-center justify-center">
        <Loader className="text-blue-800" size={64}/>
    </div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">👋 Hi, {user?.name}</h1>
      <div className="flex flex-col lg:grid lg:grid-cols-3 mt-8 p-4 gap-10">
        <DashboardCard title="Total Budget" amount={totalBudget} Icon={PiggyBank} />
        <DashboardCard title="Total Spent" amount={totalSpent} Icon={ReceiptText} />
        <DashboardCard title="Total Income Streams" amount={totalIncome} Icon={CircleDollarSign} />
      </div>
      <div className="p-4 mt-8 bg-gradient-to-br from-green-200 to-green-400  rounded-2xl">
        <h2 className="text-4xl p-2 font-bold text-wrap">✨ BudgetWise AI Financial Advice</h2>
        <p className="font-bold p-6 text-md">{advice}</p>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="p-4 lg:w-1/2">
          <h2 className="font-bold text-4xl">Latest Expenses</h2>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestExpenses.map((expense) => (
                  <TableRow key={expense._id}>
                    <TableCell className="font-bold">{expense.name}</TableCell>
                    <TableCell className="font-bold">{expense.amount}$</TableCell>
                    <TableCell className="font-bold">
                      {new Date(expense.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="p-4 lg:w-1/2">
          <h2 className="font-bold text-4xl">Latest Budgets</h2>
          <div className="overflow-y-auto mt-4 p-4 h-[350px] space-y-2">
            {latestBudgets.map((budget) => (
              <BudgetCard
                key={budget._id}
                _id={budget._id}
                icon={budget.icon}
                name={budget.name}
                amount={budget.amount}
                expenseAdded
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
