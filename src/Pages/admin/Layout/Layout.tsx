import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./layout.module.scss";
import logo from "../../../assets/logo.jpg";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/");
    axios(`${import.meta.env.VITE_APP_API_URL}/users/auth`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      toast.error(err.response.data.msg);
      localStorage.removeItem("token");
      navigate("/");
    });
  }, [navigate, token]);

  return (
    <div className={styles.admin}>
      <div className={styles.admin_sidebar}>
        <Link to="/" className={styles.admin_sidebar_logo}>
          <img src={logo} alt="" />
          <p className={styles.admin_sidebar_logo_text}>
            <span>OSIYO</span>
            <span>HOME</span>
          </p>
        </Link>
        <div className={styles.admin_sidebar_links}>
          <Link to="/admin/items">Товары</Link>
          <Link to="/admin/categories">Категории</Link>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Выйти
        </button>
      </div>
      <Outlet />
    </div>
  );
};
