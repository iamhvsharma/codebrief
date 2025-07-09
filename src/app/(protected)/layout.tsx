import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { AppSidebar } from "./dashboard/app-sidebar";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="m-2 w-full">
        <div className="border-sidebar-border bg-sidebar flex items-center gap-2 rounded-md border p-2 px-4 shadow">
            {/* <SearchBar />  */}
            <div className="ml-auto">
                <UserButton />
            </div>
        </div>
        <div className="h-4"></div>
        {/* Main content */}

        <div className="border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)]">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
