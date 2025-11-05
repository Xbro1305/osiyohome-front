import styles from "./About.module.scss";
import logo from "../../assets/logo.jpg";
import infoblock1 from "../../assets/infoblock_1.jpg";
import infoblock2 from "../../assets/infoblock_2.jpg";
import infoblock3 from "../../assets/infoblock3.webp";
import infoblock4 from "../../assets/odnotonniy.webp";
import infoblock5 from "../../assets/pechat.jpg";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { runIntersectionAnimation } from "../../widgets/Animation";
import { Link } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";
import { BiPhone } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import sert1 from "../../assets/Screenshot 2025-06-12 at 10.14.45 AM.png";
import sert2 from "../../assets/Screenshot 2025-06-12 at 10.15.11 AM.png";

export const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      runIntersectionAnimation();
    }, 100);

    const titleElement = document?.querySelector("title");
    if (titleElement) titleElement.innerText = "О компании - Osiyo Home Tex";
  }, []);

  return (
    <>
      <div className={styles.about}>
        <div className={` ${styles.about_item}`}>
          <p className="element-animation el">
            {t("companyDescription_1")}
            <br />
            <br />
            {t("companyDescription_2")}
            <br />
            <br />
            {t("companyDescription_3")}
          </p>
          <img className="element-animation er" src={logo} alt="" />
        </div>
        <div className={styles.about_item}>
          <p className="element-animation er">
            {t("cottonYarnProduction")} <br />
            <br />
          </p>
          <img className="element-animation el" src={infoblock3} alt="" />
        </div>
        <div className={styles.about_item}>
          <p className="element-animation el">
            {t("productionBase_1")} <br />
            <br />
            <span
              dangerouslySetInnerHTML={{
                __html: t("mainProductParameters_title"),
              }}
            />
            <span
              dangerouslySetInnerHTML={{
                __html: t("mainProductParameters_list"),
              }}
            />
            <br />
            <span
              dangerouslySetInnerHTML={{ __html: t("equipmentAndStaff_1") }}
            />
          </p>
          <img className="element-animation er" src={infoblock2} alt="" />
        </div>
        <div className={styles.about_item}>
          <p className="element-animation er">
            {t("cottonFabrics_description")}
            <span
              dangerouslySetInnerHTML={{ __html: t("cottonFabrics_list") }}
            />
            <br /> {t("cottonFabricsAdvantages_description")}
            <span
              dangerouslySetInnerHTML={{
                __html: t("cottonFabricsAdvantages_list"),
              }}
            />
          </p>
          <img className="element-animation el" src={infoblock1} alt="" />
        </div>
        <div className={styles.about_item}>
          <p
            className="element-animation er"
            dangerouslySetInnerHTML={{ __html: t("infoblock4") }}
          />
          <img className="element-animation el" src={infoblock4} alt="" />
        </div>
        <div className={styles.about_item}>
          <p
            className="element-animation er"
            dangerouslySetInnerHTML={{ __html: t("infoblock5") }}
          />
          <img className="element-animation el" src={infoblock5} alt="" />
        </div>
      </div>
      <div className={styles.about_sertificate_content}>
        <div className={styles.about_sertificate_left}>
          <img src={sert1} className="element-animation el" alt="" />
          <img src={sert2} className="element-animation eb" alt="" />
        </div>
        <div
          className={`element-animation er ${styles.about_sertificate_right}`}
          dangerouslySetInnerHTML={{ __html: t("sertContent") }}
        />
      </div>
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
              </Link>{" "}
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
    </>
  );
};
