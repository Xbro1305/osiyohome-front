import { useState } from "react";
import styles from "./Login.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../../widgets/Loader/Loader";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.login}>
      {loading && <Loader />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          axios(`${import.meta.env.VITE_APP_API_URL}/users/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: { username, password },
          })
            .then((res) => {
              toast.success(res.data.msg);
              localStorage.setItem("token", res.data.token);
              navigate("/admin");
            })
            .catch((err) => toast.error(err.response.data.msg))
            .finally(() => setLoading(false));
        }}
        className={styles.login_form}
      >
        <h1>Войти</h1>
        <label>
          <p>Логин</p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <p>Пароль</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Войти" />
      </form>
    </div>
  );
};
