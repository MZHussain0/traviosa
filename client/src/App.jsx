import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import IndexPage from "./pages/IndexPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context/userContext";
import AccountPage from "./pages/AccountPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/account/:subpage?"} element={<AccountPage />} />
            <Route
              path={"/account/:subpage/:action"}
              element={<AccountPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
