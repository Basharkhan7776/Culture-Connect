import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Home } from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "@/context/AuthContext";
import { PostsProvider } from '@/context/PostsContext';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Tos from "./pages/Tos";
import ForgotPassword from "./pages/ForgotPassword";




export default function App() {


  return (
    <AuthProvider>
      <PostsProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="tos" element={<Tos />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </PostsProvider>
    </AuthProvider>
  );
}
