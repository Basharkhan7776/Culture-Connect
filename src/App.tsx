import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Home } from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "@/context/AuthContext";
import { PostsProvider } from '@/context/PostsContext';




export default function App() {


  return (
    <AuthProvider>
      <PostsProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </PostsProvider>
    </AuthProvider>
  );
}
