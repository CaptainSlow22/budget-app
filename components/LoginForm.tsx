"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: SignInResponse | undefined = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res || res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Log In
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                      </div>
                      <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      </div>
                        {error && (
                          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                          </div>
                        )}
                      <button type="submit" className="w-full text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log In</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don&apos;t have an account? <Link className="underline" href={"/register"}>Register</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}

export default LoginForm