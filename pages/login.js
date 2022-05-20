import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import Head from "next/head";

const LoginPage = () => {
  const [havingAccount, setHavingAccount] = useState(true);

  return (
    <>
      <Head>
        <title>UniMovie - {havingAccount ? "Login" : "Register"}</title>
      </Head>
      <div className="flex h-screen justify-center items-center font-sora">
        {havingAccount ? (
          <LoginForm setHavingAccount={setHavingAccount} />
        ) : (
          <RegisterForm setHavingAccount={setHavingAccount} />
        )}
      </div>
    </>
  );
};

export default LoginPage;
