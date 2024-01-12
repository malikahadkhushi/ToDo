"use client";
import React, { useEffect, useState } from "react";
import {
  getTodos,
  deleteTodo,
  updateTodo,
  updateStatus,
} from "../../lib/api/todoApi";
import { useRouter } from "next/navigation";

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
  const route = useRouter();
  const [todo, setTodo] = useState<todoI[]>([]);
  const [isUpdate, setIsUpdate] = useState(true);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState("");
  const [_id, set_Id] = useState("");
  const [createdAt, setCreateAt] = useState("");
  const [user_id, setUserId] = useState("");
  const [_v, set_v] = useState(0);
  let checkedTodo: string[] = [];

  const getUserTodos = async () => {
    try {
      let userData: any = localStorage.getItem("userData");
      userData = JSON.parse(userData);
      let userTodos = await getTodos(userData.user._id);
      if (userTodos.data.length) {
        let pendingTodos = userTodos.data.filter(
          (todo: todoI) => todo.status == "Pending"
        );
        setTodo(pendingTodos);
      } else {
        setTodo([]);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      getUserTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditForm = (obj: todoI) => {
    let { title, description, status, _id, createdAt, _v, user_id } = obj;
    setIsUpdate(false);
    setTitle(title);
    setDescription(description);
    setStatus(status);
    set_Id(_id);
    setCreateAt(createdAt);
    set_v(_v);
    setUserId(user_id);
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    await updateTodo({
      title,
      description,
      status,
      _id,
      createdAt,
      _v,
      user_id,
    });
    getUserTodos();
    setIsUpdate(true);
  };

  const checkComplete = async (id: string) => {
    if (!checkedTodo.includes(id)) {
      checkedTodo.push(id);
    } else {
      checkedTodo = checkedTodo.filter((todoId) => {
        if (todoId == id) {
          return false;
        }
        return true;
      });
    }
    await updateStatus(checkedTodo);
    getUserTodos();
  };

  useEffect(() => {
    getUserTodos();
    window.onpopstate = () => {
      route.push("/Todo/Home");
      window.history.replaceState(null, "", "/Todo/Home");
    };
  }, []);

  return (
    <>
      <div className="p-5 h-screen w-full tracking-wide font-poppin">
        {isUpdate ? (
          <div>
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-medium">Today Todos</h1>
              </div>
            </div>

            <div className="pt-12">
              <div>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                        <th scope="col" className="px-6 py-3">
                          Complete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {todo?.map((t, key) => (
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
                          <td className="px-6 py-4 space-x-3">
                            <button onClick={() => handleEditForm(t)}>
                              Edit
                            </button>
                            <button onClick={() => handleDelete(t._id)}>
                              Delete
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              onChange={() => {
                                checkComplete(t._id);
                              }}
                              id={t._id}
                              type="checkbox"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-screen flex flex-col justify-center items-center w-full">
            <div>
              <h1 className="text-3xl font-semibold">Update TODO</h1>
            </div>
            <div className=" w-96 border border-lg px-5">
              <form className="flex flex-col py-10 space-y-3 justify-center w-full">
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="h-10 outline-none pl-3 py-5 border border-md rounded-md border-blue-500"
                  type="text"
                  value={title}
                  placeholder="Title"
                  required
                />
                <input
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="h-10 outline-none pl-3 py-5 border border-md rounded-md border-blue-500"
                  type="text"
                  value={description}
                  placeholder="description"
                  required
                />
                <button
                  onClick={(e) => {
                    handleUpdate(e);
                  }}
                  className=" inline-block bg-blue-700 text-white rounded-md h-10"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
