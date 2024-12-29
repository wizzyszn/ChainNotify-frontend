import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom"
import NotFound from "./pages/NotFound"
import {Home} from "./pages/Home"
import { SignUp } from "./pages/auth/SignUp"
import { Login } from "./pages/auth/Login"
import { ForgotPassword } from "./pages/auth/ForgotPassword"
import { VerifyAccount } from "./pages/auth/VerifyAccount"
import ProtectedRoute from "./components/router/protectedRoutes"
import { Settings } from "./pages/Settings"
import DashboardLayout from "@/pages/dashboard/index"
import { NotificationDetail } from "./pages/NotificationDetail"
import { Notifications } from "./pages/Notifications"
import Dashboard from "@/pages/Dashboard"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route  path="/" Component={Root} errorElement = { <NotFound/> } >
        <Route element={<Home /> } index />
        {/* Authentication Routes*/}
        <Route path="signup" element ={<SignUp />} />
        <Route path="login" element ={<Login />} />
        <Route path="forgot-password" element ={<ForgotPassword />} />
        <Route path="verify" element ={<VerifyAccount />} />
        {/* Dashboard Routes */}
        <Route element ={<ProtectedRoute />}>
        <Route element={<DashboardLayout /> } path="d"  >
        <Route element ={<Dashboard />} index />
        <Route element={<Notifications />}path="notifications" />
        <Route path="notifications/:id" element ={<NotificationDetail />} />
        <Route path="settings" element ={<Settings />} />
        </Route>
        </Route>
       
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

const Root = () => {
  return <>
  <Outlet />
  </>
}
export default App
