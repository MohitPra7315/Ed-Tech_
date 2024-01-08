import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homep"
import { Navbar } from "./Components/Common/Navbar";
import { LoginPage } from "./Pages/LoginP";
import { SignupPage } from "./Pages/signUpp";
import { Error } from "./Pages/ErrorPage";
import { Protected } from "./Components/Cores/Auth/protectedRoutes";
import { ForgotPassword } from "./Pages/forgotPassword";
import { UpdatePasswordPage } from "./Pages/UpdatePassword";
import { VerifyValidEmailPage } from "./Pages/verifyValidEmail";
import { ProfileDropdown } from "./Components/Cores/Auth/ProfileDropDown"
import { About } from "./Pages/About";
import { ContactUs } from "./Pages/ContactUs";
import { Dashboard } from "./Pages/Dashboard";
import { OpenRoute } from "./Components/Cores/Auth/OpenRoute";
import { MyProfile } from "./Components/Cores/Dashboard/Myprofile"
import Settings from "./Components/Cores/Dashboard/setting"
import EnrolledCouress from "./Components/Cores/Dashboard/ProgressCouress/progressCouress"
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={
          <OpenRoute>
            <LoginPage></LoginPage>
          </OpenRoute>
        }></Route>
        <Route path="/signup" element={
          <OpenRoute>
            <SignupPage />
          </OpenRoute>
        }></Route>

        <Route path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword></ForgotPassword>
            </OpenRoute>
          }>
        </Route>

        <Route path="/Update-Password/:id"
          element={
            <OpenRoute>
              <UpdatePasswordPage></UpdatePasswordPage>
            </OpenRoute>
          } />


        <Route path="/verify-email"
          element={
            <OpenRoute>
              <VerifyValidEmailPage />
            </OpenRoute>
          } />

        <Route path="/about" element={
          <About></About>
        } />

        <Route path="/contact" element={
          <ContactUs></ContactUs>
        } />

        <Route

          element={
            <Protected>

              <Dashboard></Dashboard>

            </Protected>

          } >
          <Route path="/dashboard/my-profile" element={<Protected><MyProfile></MyProfile></Protected>}></Route>
          <Route path="/dashboard/settings" element={<Protected><Settings></Settings></Protected>}></Route>
          <Route path="/dashboard/enrolled-courses" element={<Protected><EnrolledCouress></EnrolledCouress></Protected>}></Route>

        </Route>
        <Route path="*" element={<Error />}></Route>

      </Routes>
    </div >
  );
}

export default App;
