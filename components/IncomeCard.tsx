import React from 'react'

interface Props {
    icon: string,
    name: string,
    amount: number
}

const IncomeCard = ({icon, name, amount}: Props) => {
  return (
    <div className='p-4 bg-gray-50 h-[165.6px] flex flex-col justify-center rounded-2xl shadow-md'>
        <div className='flex  items-center justify-around'>
            <div className='flex items-center space-x-4'>
                <span className='text-2xl bg-gray-200 p-4 mx-auto rounded-full'>{icon}</span>
                <p className='font-bold text-xl'>{name}</p>
            </div>
            <div>
                <p className='font-bold text-xl'>{amount}$</p>
            </div>
        </div>
    </div>
  )
}

export default IncomeCard