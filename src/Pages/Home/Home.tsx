import styles from "./Home.module.scss"; // Import Swiper React components
import banner1 from "../../assets/HomeBanners/home-banner1.jpg";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronDown, FaTelegramPlane } from "react-icons/fa";
import infoblock1 from "../../assets/infoblock_1.jpg";
import infoblock2 from "../../assets/infoblock_2.jpg";
import infoblock3 from "../../assets/infoblock3.webp";
import { Carousel } from "./Carousel";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import { BsClock, BsInstagram, BsYoutube } from "react-icons/bs";
import { RxCheck } from "react-icons/rx";
import { FiTruck } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import { BiPhone } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import axios from "axios";
import { Loader } from "../../widgets/Loader/Loader";
import { useTranslation } from "react-i18next";
import { runIntersectionAnimation } from "../../widgets/Animation";
import andin from "../../assets/clients/andin.png";
import galtex from "../../assets/clients/galtex.jpeg";
import mirposuda from "../../assets/clients/mirposuda.jpg";
import ntk from "../../assets/clients/ntk.png";
import polese from "../../assets/clients/polese.jpg";
import protex from "../../assets/clients/protex.jpg";
import tdl from "../../assets/clients/tdl.jpg";
import valiant from "../../assets/clients/valiant.png";
import loveberry from "../../assets/clients/loveberry.jpg";
import vivamix from "../../assets/clients/vivamix.jpg";
import sert1 from "../../assets/Screenshot 2025-06-12 at 10.14.45 AM.png";
import sert2 from "../../assets/Screenshot 2025-06-12 at 10.15.11 AM.png";

export const Home = () => {
  const [news, setNews] = useState([]);
  const [sets, setSets] = useState([]);
  const [load, setLoad] = useState(true);
  const [adv, setAdv] = useState<0 | 1 | 2 | 3 | 4>(1);
  const { t } = useTranslation();

  const brands = [
    andin,
    loveberry,
    galtex,
    mirposuda,
    ntk,
    polese,
    protex,
    tdl,
    valiant,
    vivamix,
  ];

  useEffect(() => {
    axios(`${import.meta.env.VITE_APP_API_URL}/products?type=0&length=10`)
      .then((res) => setNews(res.data.innerData))
      .catch((err) => console.log(err));
    axios(`${import.meta.env.VITE_APP_API_URL}/products?type=1&length=10`)
      .then((res) => setSets(res.data.innerData))
      .catch((err) => console.log(err))
      .finally(() => setLoad(false));

    const titleElement = document?.querySelector("title");
    if (titleElement) titleElement.innerText = "Главная - Osiyo Home Tex";
  }, []);

  useEffect(() => {
    if (!load)
      setTimeout(() => {
        runIntersectionAnimation();
      }, 100);
  }, [load, adv]);
  return (
    <div className={styles.home}>
      {load && <Loader />}
      <div className={styles.home_slider}>
        <div className={styles.home_banner}>
          {/* <video
            src={banner1}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
          ></video> */}
          <img src={banner1} alt="" />
          <p className="element-animation el">{t("homeArticle")}</p>
        </div>
      </div>
      {(sets?.length != 0 || news?.length != 0) && (
        <div className={styles.home_categories}>
          <h1 className={`element-animation ${styles.home_title}`}>
            {t("newProducts")}
          </h1>

          {news?.length != 0 && (
            <div className={styles.home_categories_carousel}>
              <section>
                <h2 className={`element-animation el ${styles.home_subtitle}`}>
                  {t("freshFabrics")}
                </h2>
                <Link to="/catalog/fabrics" className="element-animation er">
                  {t("goTo")}
                  <span>
                    <FaArrowRight />
                  </span>
                </Link>
              </section>
              <Carousel items={news} />
            </div>
          )}
          {sets?.length != 0 && (
            <div className={styles.home_categories_carousel}>
              <section>
                <h2 className={`element-animation el ${styles.home_subtitle}`}>
                  {t("freshSets")}
                </h2>
                <Link
                  to="/catalog/bedding-sets"
                  className="element-animation er"
                >
                  {t("goTo")}
                  <span>
                    <FaArrowRight />
                  </span>
                </Link>
              </section>
              <Carousel items={sets} />
            </div>
          )}
        </div>
      )}

      <div className={`element-animation eb ${styles.home_infoBlock}`}>
        <section>
          <h1 className={`element-animation ${styles.home_title}`}>
            OSIYO HOME TEX
          </h1>
          <p
            className={`element-animation el ${styles.home_text}`}
            dangerouslySetInnerHTML={{ __html: t("homeCompanyDescription") }}
          ></p>
        </section>
        <figure>
          <img
            loading="lazy"
            className="element-animation eb"
            src={infoblock1}
            alt=""
          />
          <img
            loading="lazy"
            className="element-animation er"
            src={infoblock2}
            alt=""
          />
        </figure>
      </div>
      <div className={styles.home_companyAdv}>
        <div className={styles.home_companyAdv_item}>
          <BsClock className="element-animation" />
          <p className="element-animation el">{t("fastOrderProcessing")}</p>
          <span className="element-animation eb">{t("modernEquipment")}</span>
        </div>
        <div className={styles.home_companyAdv_item}>
          <RxCheck className="element-animation" />
          <p className="element-animation el">{t("highQuality")}</p>
          <span className="element-animation eb">
            {t("qualityDescription")}
          </span>
        </div>
        <div className={styles.home_companyAdv_item}>
          <FiTruck className="element-animation" />
          <p className="element-animation el">{t("worldwideDelivery")}</p>
          <span className="element-animation eb">
            {t("deliveryDescription")}
          </span>
        </div>
      </div>
      <div className={styles.home_advantages}>
        <div className={styles.home_advantages_top}>
          <p
            className={`element-animation ${styles.home_subtitle}`}
            style={{ background: adv == 1 ? "var(--gray)" : "" }}
            onClick={() => setAdv(1)}
          >
            {t("aboutCompany")}
          </p>
          <p
            className={`element-animation ${styles.home_subtitle}`}
            style={{ background: adv == 2 ? "var(--gray)" : "" }}
            onClick={() => setAdv(2)}
          >
            {t("yarnTitle")}
          </p>{" "}
          <p
            className={`element-animation ${styles.home_subtitle}`}
            style={{ background: adv == 3 ? "var(--gray)" : "" }}
            onClick={() => setAdv(3)}
          >
            {t("production")}
          </p>
          <p
            className={`element-animation ${styles.home_subtitle}`}
            style={{ background: adv == 4 ? "var(--gray)" : "" }}
            onClick={() => setAdv(4)}
          >
            {t("advantages")}
          </p>
        </div>
        <div
          className={`element-animation eb ${styles.home_advantages_content}`}
        >
          {adv === 1 && (
            <div className={`${styles.home_advantages_item}`}>
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
          )}
          {adv === 2 && (
            <div className={`${styles.home_advantages_item}`}>
              <p className="element-animation el">
                {t("cottonYarnProduction")} <br />
                <br />
              </p>
              <img className="element-animation er" src={infoblock3} alt="" />
            </div>
          )}
          {adv === 3 && (
            <div className={`${styles.home_advantages_item}`}>
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
              <img className="element-animation er" src={infoblock3} alt="" />
            </div>
          )}
          {adv === 4 && (
            <div className={`${styles.home_advantages_item}`}>
              <p className="element-animation el">
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
              <img className="element-animation er" src={infoblock1} alt="" />
            </div>
          )}
        </div>
      </div>
      <div className={styles.home_advantages_mob}>
        <div
          style={{ background: "var(--gray)" }}
          className="element-animation"
          onClick={() => setAdv(adv == 1 ? 0 : 1)}
        >
          <p className={styles.home_subtitle}>
            {t("aboutCompany")}
            <FaChevronDown
              style={{
                transform: adv == 1 ? "rotate(180deg)" : "",
              }}
            />
          </p>
          {adv === 1 && (
            <div className={styles.home_advantages_mob_item}>
              <p>
                {t("companyDescription_1")}
                <br />
                <br />
                {t("companyDescription_2")}
                <br />
                <br />
                {t("companyDescription_3")}
              </p>
              <img src={logo} alt="" />
            </div>
          )}
        </div>
        <div
          style={{ background: "var(--gray)" }}
          className="element-animation"
          onClick={() => setAdv(adv == 2 ? 0 : 2)}
        >
          <p
            className={styles.home_subtitle}
            style={{ background: "var(--gray)" }}
            onClick={() => setAdv(adv == 2 ? 0 : 2)}
          >
            {t("yarnTitle")}
            <FaChevronDown
              style={{
                transform: adv == 2 ? "rotate(180deg)" : "",
              }}
            />
          </p>
          {adv === 2 && (
            <div className={styles.home_advantages_mob_item}>
              <p>
                {t("cottonYarnProduction")} <br />
              </p>
              <img src={infoblock3} alt="" />
            </div>
          )}
        </div>
        <div
          style={{ background: "var(--gray)" }}
          className="element-animation"
          onClick={() => setAdv(adv == 3 ? 0 : 3)}
        >
          <p
            className={styles.home_subtitle}
            style={{ background: "var(--gray)" }}
            onClick={() => setAdv(adv == 3 ? 0 : 3)}
          >
            {t("production")}
            <FaChevronDown
              style={{
                transform: adv == 3 ? "rotate(180deg)" : "",
              }}
            />
          </p>
          {adv === 3 && (
            <div className={styles.home_advantages_mob_item}>
              <p>
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
              <img src={infoblock2} alt="" />
            </div>
          )}
        </div>
        <div
          style={{ background: "var(--gray)" }}
          className="element-animation"
          onClick={() => setAdv(adv == 4 ? 0 : 4)}
        >
          <p
            className={styles.home_subtitle}
            style={{ background: "var(--gray)" }}
            onClick={() => setAdv(adv == 4 ? 0 : 4)}
          >
            {t("advantages")}
            <FaChevronDown
              style={{
                transform: adv == 4 ? "rotate(180deg)" : "",
              }}
            />
          </p>
          {adv === 4 && (
            <div className={styles.home_advantages_mob_item}>
              <p>
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
              <img src={infoblock1} alt="" />
            </div>
          )}
        </div>
      </div>
      <div className={styles.home_sertificate}>
        <h1 className={`element-animation el ${styles.title}`}>
          {t("sertificates")}
        </h1>

        <div className={styles.home_sertificate_content}>
          <div className={styles.home_sertificate_left}>
            <img src={sert1} className="element-animation el" alt="" />
            <img src={sert2} className="element-animation eb" alt="" />
          </div>
          <div
            className={`element-animation er ${styles.home_sertificate_right}`}
            dangerouslySetInnerHTML={{ __html: t("sertContent") }}
          />
        </div>
      </div>
      <div className={styles.home_clients}>
        <h1 className={`element-animation el ${styles.home_title}`}>
          {t("clients")}
        </h1>
        <div className={`element-animation eb ${styles.marquee}`}>
          <div className={styles.marquee__inner}>
            {[...brands, ...brands].map((brand, idx) => (
              <img
                src={brand}
                className={styles.marquee__item}
                key={idx}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.home_contacts}>
        <div className={styles.home_contacts_left}>
          <h1 className={`element-animation ${styles.home_title}`}>
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
