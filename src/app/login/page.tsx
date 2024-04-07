import React, { FC } from "react";
import LoginForm from "./components/login-form";
export interface LoginProps {}
const Login: FC<LoginProps> = () => {
  return (
    <div className="relative flex h-screen w-screen">
      <div className="absolute left-2 top-5 lg:left-5 text-2xl font-semibold underline underline-offset-4">
        BarrySong
      </div>
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
          <LoginForm />
        </div>
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/white-building.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative hidden w-1/2 flex-col-reverse rounded-medium p-10 shadow-small lg:flex"
      ></div>
    </div>
  );
};

export default Login;
