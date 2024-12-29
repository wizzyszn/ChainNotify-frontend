import { Link, useLocation } from "react-router-dom";
import { Activity, BarChart2, Bell, Home, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { ThemeToggle } from "../ThemeToggle";
import { WalletConnectButton } from "../WalletConnectButton";
import { Logo } from "../ui/Logo";

export function Sidenav() {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "" },
    { icon: Bell, label: "Notifications", path: "notifications" },
    { icon: Settings, label: "Settings", path: "settings" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link
          to="/"
          className="flex items-center text-white text-xl md:text-2xl font-bold"
        >
          <Logo size={32} color="green" />
          <span className="ml-2 text-primary">CryptoNotify</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.path}
              >
                <Link to={item.path} className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2">
          <ThemeToggle />
          <WalletConnectButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
