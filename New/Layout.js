import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  Wrench, 
  Wheat, 
  CloudSun, 
  User, 
  Menu,
  Sprout,
  TrendingUp
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
    color: "text-green-600"
  },
  {
    title: "Equipment",
    url: createPageUrl("Equipment"),
    icon: Wrench,
    color: "text-amber-600"
  },
  {
    title: "Crop Guide",
    url: createPageUrl("CropGuide"),
    icon: Wheat,
    color: "text-emerald-600"
  },
  {
    title: "Weather",
    url: createPageUrl("Weather"),
    icon: CloudSun,
    color: "text-blue-600"
  },
  {
    title: "Profile",
    url: createPageUrl("Profile"),
    icon: User,
    color: "text-purple-600"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary-green: #16a34a;
          --secondary-green: #22c55e;
          --accent-amber: #f59e0b;
          --earth-brown: #92400e;
          --sky-blue: #0ea5e9;
          --warm-orange: #ea580c;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-green-50 to-emerald-50">
        <Sidebar className="border-r border-green-100 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-green-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">AgriConnect</h2>
                <p className="text-sm text-gray-600">Smart Farming Platform</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-green-50 transition-all duration-200 rounded-xl mb-2 h-12 ${
                          location.pathname === item.url ? 'bg-green-50 border-l-4 border-green-500 shadow-sm' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-4 px-4 py-3">
                          <item.icon className={`w-5 h-5 ${item.color}`} />
                          <span className="font-medium text-gray-700">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <div className="mx-3 mt-6 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">Market Alert</span>
                </div>
                <p className="text-sm text-green-100">Wheat prices up 8% this week!</p>
              </div>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-green-100 p-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">Empowering Farmers</p>
              <p className="text-xs text-gray-500">Building Rural Communities</p>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-green-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-gray-800">AgriConnect</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
