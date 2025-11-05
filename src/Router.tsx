import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header } from "./widgets/Header/Header";
import { Home } from "./Pages/Home/Home";
import { About } from "./Pages/About/About";
import { Contact } from "./Pages/Contact/Contact";
import { Catalog } from "./Pages/Catalog/Catalog";
import { CatalogCategory } from "./Pages/CatalogCategory/Category";
import { CatalogItem } from "./Pages/CatalogItem/Item";
import { Login } from "./Pages/admin/Login/Login";
import { ToastContainer } from "react-toastify";
import { AdminLayout } from "./Pages/admin/Layout/Layout";

import { useEffect } from "react";
import { AdminItems } from "./Pages/admin/Items/Items";
import { AdminCategories } from "./Pages/admin/Categories/Categories";

export const Router = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contact />} />
            <Route path="/catalog/:type" element={<Catalog />} />
            <Route
              path="/catalog/category/:category"
              element={<CatalogCategory />}
            />{" "}
            <Route path="/catalog/item/:art" element={<CatalogItem />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="*"
              element={
                <div
                  style={{
                    padding: "50px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1>Page not found</h1>
                  <Link to="/">Go home</Link>
                </div>
              }
            />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Navigator />} />
            <Route path="/admin/items" element={<AdminItems />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

const Navigator = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin/items", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return null;
};

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
