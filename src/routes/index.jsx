import MainLayout from "@/components/layouts/MainLayout";
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";
import Filter from "@/pages/Filter";
import View from "@/pages/View";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/setting", element: <Settings /> },
      { path: "/filter", element: <Filter /> },
      { path: "/view", element: <View /> },
    ],
  },
];
