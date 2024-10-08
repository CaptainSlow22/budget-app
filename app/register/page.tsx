import RegisterForm from '@/components/RegisterForm'
import React from 'react'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from '@/lib/auth';

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");
  return (
    <div>
        <RegisterForm/>
    </div>
  )
}

export default RegisterPage