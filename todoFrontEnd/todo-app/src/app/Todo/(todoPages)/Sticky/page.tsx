'use client'

import React, { useEffect, useState } from 'react'
import {getTodos} from '../../lib/api/todoApi';

interface todoI {
  _id: string;
  title: string;
  description: string;
  status: string;
  user_id: string;
  createdAt: string;
  _v: number;
}

function Page() {

  const [todo, setTodo] = useState<todoI[]>([]);


  const getUserTodos = async () => {

    try {
      let userData: any = localStorage.getItem("userData");
      userData = JSON.parse(userData);
      let {data} = await getTodos(userData.user._id);
     
      setTodo(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }

  };
  useEffect(()=>{
    getUserTodos();
  },[])

  return (
    <div className='p-5 w-full flex gap-8  flex-wrap'> 
     {
      todo.map((t:todoI)=>

       <>
        <div className={t.status == "Pending" ?`bg-yellow-200 w-56 h-56 flex-grow cursor-pointer lg:max-w-72 p-8 hover:scale-105 duration-700 rounded-md shadow-md shadow-zinc-500/30`:`bg-green-300 w-56 h-56 flex-grow cursor-pointer lg:max-w-72 p-8 hover:scale-105 duration-700 rounded-md shadow-md shadow-zinc-500/30`}>
        <div>
          <h1 className='text-lg font-bold tracking-wider text-zinc-800 '>{t.title}</h1>
        </div>
        <div>
          <p className='text-sm tracking-wide pl-3 pt-2'>{t.description}</p>
        </div>
      </div>
       </>
      )
     }
    </div>
  )

}

export default Page