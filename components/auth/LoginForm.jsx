import { useState } from "react";
import { signIn, handleFormChange } from "../../utils/api";
import { useRouter } from "next/dist/client/router";

const LoginForm = ({ setHavingAccount }) => {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  return (
    <div className="flex flex-col w-96 rounded-lg bg-gray-800 p-6">
      <form onSubmit={(e) => signIn(e, formValue, router)}>
        <p className="text-center font-bold text-3xl text-red-600">UniMovie</p>
        <div className="my-4">
          <label className="block my-2" htmlFor="username">
            Username:
          </label>
          <input
            type="email"
            className="w-full rounded-lg p-2 text-black"
            value={formValue.username}
            name="username"
            onChange={(e) => handleFormChange(e, formValue, setFormValue)}
          />
          <label className="block my-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            className="w-full rounded-lg p-2 text-black"
            value={formValue.password}
            name="password"
            onChange={(e) => handleFormChange(e, formValue, setFormValue)}
          />
          <button className="bg-red-600 w-full rounded-lg p-2 my-4 uppercase hover:bg-red-700 transition-colors text-sm">
            sign in
          </button>
        </div>
      </form>
      <div className="text-sm text-center">
        <p>
          Don't have account?{" "}
          <span
            className="text-red-600 hover:text-red-500 cursor-pointer underline"
            onClick={() => setHavingAccount(false)}
          >
            Sign up
          </span>
        </p>
        <p>or</p>
        <p>Login with</p>
        <div className="flex gap-x-2 justify-center my-2">
          <div className="flex justify-center items-center w-6 h-6 fill-white hover:fill-red-600 hover:border-red-600 cursor-pointer transition-colors border border-white rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              className="w-3 h-3"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </div>
          <div className="flex justify-center items-center w-6 h-6 fill-white hover:fill-red-600 hover:border-red-600 cursor-pointer transition-colors border border-white rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="w-3 h-3"
            >
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
