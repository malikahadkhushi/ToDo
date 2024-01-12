"use client";
import { useState } from "react";
import Link from "next/link";
import { postData } from "../../lib/api/authApi";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [profession, setProfession] = useState("");
  const [image, setImage] = useState<string>("");
  const route = useRouter();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader: FileReader = new FileReader();

      reader.onload = function (event: ProgressEvent<FileReader>) {
        const imageUrl: string = event.target?.result as string;

        // Storing image data in the state
        setImage(imageUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const postUserData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email && password && name && image && profession) {
      let ack = await postData({
        email: email,
        password: password,
        userName: name,
        profession: profession,
        profileImage: image,
      });

      if (ack) {
        route.push("/Todo/pages/Login");
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col w-full justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto shadow-lg rounded-md p-5  sm:max-w-xl ">
          <form className="space-y-6">
            {/* First Row of the form */}
            <div className="flex gap-4 justify-between">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                    }}
                    autoComplete="email"
                    required
                    className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setName(e.target.value);
                    }}
                    autoComplete="email"
                    required
                    className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Second row of the form */}
            <div className="flex gap-4 justify-between">
              <div>
                <label
                  htmlFor="Profession"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Profession
                </label>
                <div className="mt-2">
                  <input
                    id="Profession"
                    name="Profession"
                    type="text"
                    placeholder="Enter Profession"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setProfession(e.target.value);
                    }}
                    autoComplete="email"
                    required
                    className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                    autoComplete="current-password"
                    placeholder="Enter Password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <div>
                <label
                  htmlFor="Profession"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
                <div className="mt-2">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageUpload}
                    required
                    className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={postUserData}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Have an Account?{" "}
            <Link
              href={"/Todo/pages/Login"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
