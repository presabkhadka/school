import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/view/school/Landing";
import { ThemeProvider } from "@/components/theme-provider";
import AboutUs from "./pages/view/school/AboutUs";
import { Toaster } from "react-hot-toast";
import Gallery from "./pages/view/school/Gallery";
import Contact from "./pages/view/school/Contact";
import Login from "./pages/auth/Login";
import AdminAuthGuard from "./guards/AdminAuthGuard";
import AdminDashboard from "./pages/view/admin/AdminDashboard";
import Notice from "./pages/view/school/Notice";
import Staff from "./pages/view/admin/Staff";
import AdminGallery from "./pages/view/admin/AdminGallery";
import AdminNotice from "./pages/view/AdminNotice";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider
        router={createBrowserRouter([
          { path: "/", element: <Landing /> },
          { path: "/about", element: <AboutUs /> },
          { path: "/gallery", element: <Gallery /> },
          { path: "/notice", element: <Notice /> },
          { path: "/contact-us", element: <Contact /> },
          { path: "/admin/login", element: <Login /> },
          {
            path: "/admin",
            element: <AdminAuthGuard />,
            children: [
              { path: "/admin/dashboard", element: <AdminDashboard /> },
              { path: "/admin/staffs", element: <Staff /> },
              { path: "/admin/gallery", element: <AdminGallery /> },
              { path: "/admin/notice", element: <AdminNotice /> },
            ],
          },
        ])}
      ></RouterProvider>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
