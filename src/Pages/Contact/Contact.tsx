import { BiPhone } from "react-icons/bi";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./Contact.module.scss";
import { useEffect, useState, type FormEvent } from "react";
import { TfiEmail } from "react-icons/tfi";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { runIntersectionAnimation } from "../../widgets/Animation";

export const Contact = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [text, setText] = useState<string>("");

  const { t } = useTranslation();

  useEffect(() => {
    const titleElement = document?.querySelector("title");
    if (titleElement) titleElement.innerText = "Контакты - Osiyo Home Tex";

    emailjs.init("RZZxM8VbiJBQE2jC2");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      runIntersectionAnimation();
    }, 100);
  }, []);

  const send = (e: FormEvent) => {
    e.preventDefault();

    emailjs
      .send("service_c3rh8z1", "template_qc8vwhj", {
        name,
        email,
        message: text,
        title: theme,
      })
      .then(() => {
        toast.success("Сообщение отправлено");
      })
      .catch(() => {
        alert("Произошла ошибка");
      });
  };

  return (
    <div className={styles.contact}>
      <h1
        style={{ marginBottom: "-50px" }}
        className={`element-animation et ${styles.title} ${styles.contact_top}`}
      >
        {t("contact_title")}
      </h1>
      <form onSubmit={(e) => send(e)} className={styles.contact_top}>
        <div className={styles.contact_top_left}>
          <label className="element-animation">
            <p>{t("yourName")}</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>{" "}
          <label className="element-animation el">
            <p>{t("yourEmail")}</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>{" "}
          <label className="element-animation eb">
            <p>{t("questionSubject")}</p>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.contact_top_left}>
          <label className="element-animation er">
            <p>{t("message")}</p>
            <textarea
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              id=""
            ></textarea>
          </label>
          <input
            className="element-animation eb"
            type="submit"
            value={t("send")}
          />
        </div>
      </form>
      <div className={styles.contacts}>
        <div className={styles.contacts_left}>
          <h1 className={`element-animation ${styles.title}`}>
            {t("contacts")}
          </h1>
          <p className="element-animation el">
            <MdLocationPin />
            {t("address")}
          </p>
          <section className="element-animation el">
            <Link to="tel:+998907520033">
              <BiPhone />
              +998 907520033
            </Link>
            <Link to="tel:+998906950033">
              <BiPhone />
              +998 906950033
            </Link>
            <Link to="tel:+998911801311">
              <BiPhone />
              +998 911801311
            </Link>
          </section>
          <section className="element-animation eb">
            <span>{t("socialMedia")}</span>
            <Link target="_blank" to="https://t.me/OsiyoHomeTex1">
              <FaTelegramPlane /> @OsiyoHomeTex1
            </Link>
            <Link target="_blank" to="https://www.instagram.com/osiyohometex/">
              <BsInstagram /> @osiyohometex
            </Link>
            <Link target="_blank" to="https://youtube.com/@Osiyohome">
              <BsYoutube />
              @Osiyohome
            </Link>
            <Link target="_blank" to="mailto:osiyotex@gmail.com">
              <TfiEmail /> osiyotex@gmail.com
            </Link>
          </section>
          <section className="element-animation eb">
            <span>
              {t("developer")}{" "}
              <Link target="_blank" to="https://t.me/sh4rifoff">
                <FaTelegramPlane /> Akhmadjon Sharifov
              </Link>
            </span>
          </section>
          <p className="element-animation eb">
            © 2017–{new Date().getFullYear()}, {t("companyName")}
          </p>
        </div>
        <iframe
          className="element-animation eb"
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d6023.930386428343!2d71.606341!3d40.982243!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDU4JzU2LjEiTiA3McKwMzYnMjIuOCJF!5e0!3m2!1sru!2sus!4v1748340661772!5m2!1sru!2sus"
          width="600"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
