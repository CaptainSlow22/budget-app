import React from 'react'
import { Trash } from 'lucide-react'

interface Props {
    icon: string,
    name: string,
    amount: number,
    onDelete: () => void
}

const IncomeCard = ({icon, name, amount, onDelete}: Props) => {
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
        <div className='flex self-end'>
            <button onClick={onDelete} className='bg-red-600 p-2 rounded-full'><Trash className='text-white' /></button>
        </div>
    </div>
  )
}

export default IncomeCard