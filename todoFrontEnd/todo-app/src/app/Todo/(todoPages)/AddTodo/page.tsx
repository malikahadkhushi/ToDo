"use client";

import { useState } from "react";
import { postTodoData } from "../../lib/api/todoApi";
import { useRouter } from "next/navigation";

interface userDataI {
  token: string;
  user: {
    _id: string;
    userName: string;
    profession: string;
    email: string;
    profileImage: string;
  };
}
const Page = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const route = useRouter();

  const postTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    let userDataString = localStorage.getItem("userData") as string;
    let userData: userDataI;

    userData = JSON.parse(userDataString);
    e.preventDefault();
    let todoObj = {
      title: "",
      description: "",
      status: "Pending",
      user_id: "",
    };
    todoObj.title = title;
    todoObj.description = description;
    todoObj.user_id = userData.user._id;

    postTodoData(todoObj);
    setTitle("");
    setDescription("");
    route.push("/Todo/Home");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center w-full">
      <div>
        <h1 className="text-3xl font-semibold">ADD TODO</h1>
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
            onClick={postTodo}
            className=" inline-block bg-blue-700 text-white rounded-md h-10"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
