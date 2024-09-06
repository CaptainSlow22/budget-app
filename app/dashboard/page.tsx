"use client"
import React from 'react'
import { signOut } from 'next-auth/react';
const Dashboard = () => {
  return (
    <div className='p-4'>
        <button onClick={() => signOut({callbackUrl: "/", redirect: true})}>Sign Out</button>
    </div>
  )
}

export default Dashboard;