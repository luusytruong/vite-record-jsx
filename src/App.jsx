import "./App.css";
import { routes } from "./routes";
import { HashRouter, useRoutes } from "react-router-dom";
import { Suspense } from "react";

function AppRoutes() {
  const el = useRoutes(routes);
  return el;
}
function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </HashRouter>
  );
}

export default App;
