import { Sidenav } from '@/components/dashboard/SideNav'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Bell, Menu } from 'lucide-react'
import { Outlet } from 'react-router-dom'


function DashboardLayout() {

  return (
        <ThemeProvider>
         <SidebarProvider>
          <div className="flex h-screen bg-background w-full">
            <Sidenav />
            <div className="flex-1 flex flex-col overflow-hidden">
              <header className="flex justify-between items-center p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarTrigger>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SidebarTrigger>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-background/50 backdrop-blur-sm"
                  >
                    <Bell className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Notifications</span>
                  </Button>
                </div>
              </header>
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[url('/blockchain-bg.jpg')] bg-cover bg-center bg-fixed">
                <div className="container mx-auto p-4">
                  <div className="backdrop-blur-sm bg-background/30 min-h-full p-4 rounded-lg">
                  <Outlet />
                  </div>
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
        </ThemeProvider>

  )
}


export default DashboardLayout