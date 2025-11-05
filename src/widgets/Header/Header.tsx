import styles from "./Header.module.scss";
import logo from "../../assets/logo.jpg";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { runIntersectionAnimation } from "../Animation";

export const Header = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      runIntersectionAnimation();
    }, 100);
  }, []);

  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={`${styles.header} ${open ? styles.active : ""}`}>
      <Link to={"/"} className={`element-animation el ${styles.header_logo}`}>
        <img src={logo} alt="" />
        <p className={styles.header_logo_text}>
          <span>OSIYO</span>
          <span>HOME</span>
        </p>
      </Link>

      <nav className={`${styles.header_links} element-animation`}>
        <NavLink onClick={() => setOpen(false)} className="header_link" to="/">
          {t("home")}
        </NavLink>
        <NavLink
          onClick={() => setOpen(false)}
          className="header_link"
          to="/about"
        >
          {t("about")}
        </NavLink>
        <div
          style={{ textAlign: "left", padding: "10px" }}
          className="header_link"
        >
          {t("catalog")}
          <section>
            <NavLink onClick={() => setOpen(false)} to={"/catalog/fabrics"}>
              {t("fabrics_title")}
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to={"/catalog/bedding_sets"}
            >
              {t("beddingSets_title")}
            </NavLink>
          </section>
        </div>
        <NavLink
          onClick={() => setOpen(false)}
          className="header_link"
          to="/contacts"
        >
          {t("contacts")}
        </NavLink>
        <section className="element-animation er">
          <select
            value={localStorage.getItem("i18nextLng") || "en"}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="ru">Русский</option>
            <option value="uz">O'zbek</option>
            <option value="en">English</option>
          </select>
        </section>
      </nav>

      <button
        onClick={() => setOpen(!open)}
        className={`element-animation er ${styles.header_burger}`}
      >
        {open ? (
          <p>&times;</p>
        ) : (
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        )}
      </button>
    </header>
  );
};
