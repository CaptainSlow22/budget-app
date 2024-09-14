import React from 'react'

interface Props {
    title: string,
    amount: number
    Icon: React.ElementType
}

const DashboardCard = ({title, amount, Icon}: Props) => {
  return (
    <div className='py-8 px-4 space-x-4 flex justify-between bg-gray-100 rounded-2xl'>
        <div className='flex flex-col'>
            <h2 className='font-bold text-md text-nowrap'>{title}</h2>
            <span className='font-bold text-xl'>{amount}$</span>
        </div>
        <div className='flex bg-blue-800 p-4 rounded-full items-center'>
            {<Icon className="text-white"/>}
        </div>
    </div>
  )
}

export default DashboardCard