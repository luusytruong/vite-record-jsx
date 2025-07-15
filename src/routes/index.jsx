import MainLayout from "@/components/layouts/MainLayout";
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
];
