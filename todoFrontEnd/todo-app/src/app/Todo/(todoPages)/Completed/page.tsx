"use client";
import React, { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "../../lib/api/todoApi";
function Page() {
  interface todoI {
    _id: string;
    title: string;
    description: string;
    status: string;
    user_id: string;
    createdAt: string;
    _v: number;
  }

  const [completedTask, setCompletedTask] = useState<todoI[]>([]);

  const getUserTodos = async () => {
    try {

      let userData: any = localStorage.getItem("userData");
      userData = JSON.parse(userData);
      let userTodos = await getTodos(userData.user._id);

      if(userTodos.data.length){
        let completedTodos = userTodos.data.filter(
            (todo: todoI) => todo.status == "completed"
          );
          setCompletedTask(completedTodos);
     }else{
        setCompletedTask([])
     }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    getUserTodos();
  },[]);

  const handleDelete = async (id: string) => {
    try {
        console.log("delete")
      await deleteTodo(id);
      getUserTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

return (
    <div className="p-5 w-full">
      <div>
        <h1 className="text-2xl font-medium">Completed Task</h1>
        {completedTask.length > 0 ? (
          <table className="w-full text-sm text-center mt-10 rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {completedTask.map((t, key) => (
                <tr
                  key={key}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {t.title}
                  </th>
                  <td className="px-6 py-4">{t.description}</td>
                  <td className="px-6 py-4">{t.status}</td>
                  <button
                    onClick={() => {
                      handleDelete(t._id);
                    }}
                    className="bg-zinc-300 py-1 px-3 mt-3 rounded-sm text-sm text-black "
                  >
                    delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Data</p>
        )}
      </div>
    </div>
  );
  
}

export default Page;
