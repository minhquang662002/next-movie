import { useState } from "react";
import { useRouter } from "next/router";
import { signUp } from "../../utils/api";
import { handleFormChange } from "../../utils/api";
const RegisterForm = ({ setHavingAccount }) => {
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const router = useRouter();

  return (
    <div className="flex flex-col w-96 rounded-lg bg-gray-800 p-6">
      <form onSubmit={(e) => signUp(e, formValue, router)}>
        <p className="text-center font-bold text-3xl text-red-600">UniMovie</p>
        <div className="my-4">
          <label className="block my-2" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            className="w-full rounded-lg p-2 text-black"
            value={formValue.username}
            name="username"
            onChange={(e) => handleFormChange(e, formValue, setFormValue)}
          />
          <label className="block my-2" htmlFor="username">
            Email:
          </label>
          <input
            type="email"
            className="w-full rounded-lg p-2 text-black"
            value={formValue.email}
            name="email"
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
          <label className="block my-2" htmlFor="password">
            Confirm password:
          </label>
          <input
            type="password"
            className="w-full rounded-lg p-2 text-black"
            value={formValue.confirm_password}
            name="confirm_password"
            onChange={(e) => handleFormChange(e, formValue, setFormValue)}
          />
          <button className="bg-red-600 w-full rounded-lg p-2 my-4 uppercase hover:bg-red-700 transition-colors text-sm">
            sign up
          </button>
        </div>
      </form>
      <div className="text-sm text-center">
        <p>
          Already have account?{" "}
          <span
            className="text-red-600 hover:text-red-500 cursor-pointer underline"
            onClick={() => setHavingAccount(true)}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
