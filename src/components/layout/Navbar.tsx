"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
// import { Dropdown, MenuProps } from "antd";

import {
  BellAlertIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  let title = "";
  switch (path) {
    case "/home":
      title = "Home";
      break;
    case "/reports":
      title = "Reports";
      break;
    case "/utility":
      title = "Models";
      break;
  }

  const handleLogout = () => {
    const params = new URLSearchParams({
      client_id: "4m0hag52dfnj127l4ijujfn5i6",
      logout_uri: "http://localhost:3000/logout",
    });
    const url = `https://cecl.auth.us-east-1.amazoncognito.com/logout?${params}`;

    console.log(url);
    router.replace(url);
  };

  const items = [
    {
      key: 1,
      label: <Link href="/">Home</Link>,
    },
    {
      key: 2,
      label: <Link href="/logs">Logs</Link>,
    },
    {
      key: 3,
      label: <Link href="/settings">Settings</Link>,
    },
    {
      key: 4,
      label: <p onClick={handleLogout}>Logout</p>,
      danger: true,
    },
  ];

  return (
    <div className="sticky  w-full border-b border-black/20">
      <div className="flex flex-row items-center">
        <div className="ml-20 px-20 text-2xl">{title}</div>
        <div className="flex h-full flex-1 flex-row items-center justify-end space-x-2 p-4">
          <div className="flex flex-row space-x-4">
            <BellAlertIcon className="h-6 w-6" />
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
          </div>
          {/* <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
            rootClassName="w-44 text-center"
          >
            <UserCircleIcon className="h-10 w-10 text-blue-500" />
          </Dropdown> */}
        </div>
      </div>
    </div>
  );
}
