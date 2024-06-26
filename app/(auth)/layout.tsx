import { ReactNode } from "react";

const AuthenticationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      // style={{
      //   backgroundImage: `url("images/login-background.jpg") opacity-900`,
      // }}
      className="relative flex h-screen w-screen  items-center justify-center bg-gray-800   "
    >
      <div className="absolute left-6 top-2  text-3xl font-bold italic text-gray-300">
        CredPulse
      </div>
      <div className="  shadow-t-2xl flex w-full flex-col justify-center space-y-6 rounded bg-gray-800 p-4  text-gray-300  shadow-2xl  shadow-gray-700   sm:w-[350px]">
        {children}
      </div>
    </div>
  );
};

export default AuthenticationLayout;
