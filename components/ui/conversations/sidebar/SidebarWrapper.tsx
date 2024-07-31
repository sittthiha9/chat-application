import React from "react";
import DesktopNav from "./DesktopNav";

type Props = React.PropsWithChildren<{}>;

const SidebarWrapper = ({ children }: Props) => {
  return (
    <div className="h-full w-full p-4 flex flex-col lg:flex-row gap-4 bg-background">
      <DesktopNav/>
      <main className="h-[clac(100vh-80px)] w-full bg-white rounded-lg flex shadow-lg">
        {children}
      </main>
    </div>
  );
};

export default SidebarWrapper;
