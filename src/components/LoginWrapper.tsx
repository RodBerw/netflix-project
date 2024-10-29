import React from "react";

export default function LoginWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full h-[100vh] flex items-center justify-center"
      style={{ backgroundImage: "url('/images/netflix-login-bg.jpg')" }}
    >
      <div className="w-full max-w-md flex flex-col pt-12 pr-16 pb-12 pl-16 bg-black bg-opacity-70 h-fit">
        {children}
      </div>
    </div>
  );
}
