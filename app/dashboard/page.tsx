"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        console.log(userId);
        const res = await fetch(`/api/get/getUserById/${userId}`);
        if (!res.ok) {
          throw new Error('Network response error');
        }
        const data: User = await res.json(); 
        setUser(data);

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold'>👋 Hi, {user?.name}</h1>
    </div>
  );
};

export default Dashboard;
