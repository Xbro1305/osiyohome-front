import styles from "./Item.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../widgets/Loader/Loader";
import { useTranslation } from "react-i18next";
import { runIntersectionAnimation } from "../../widgets/Animation";

export const CatalogItem = () => {
  const [opened, setOpened] = useState<string | false>(false);
  const { t } = useTranslation();
  const { art } = useParams();
  const [item, setItem] = useState<any | null>(null);
  const [loadin, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios(`${import.meta.env.VITE_APP_API_URL}/products/?article=${art}`)
      .then((res) => setItem(res.data.innerData[0]))
      .catch((err) => toast.error(err.response.data.msg))
      .finally(() => setLoading(false));
  }, [art]);

  useEffect(() => {
    const titleElement = document?.querySelector("title");
    if (titleElement) {
      if (!item) return;
      else if (item?.type == 1)
        titleElement.innerText = item?.name + " - Osiyo Home Tex";
      else titleElement.innerText = item?.article + " - Osiyo Home Tex";
    }
  }, [item]);

  useEffect(() => {
    if (!loadin)
      setTimeout(() => {
        runIntersectionAnimation();
      }, 100);
  }, [loadin]);

  if (!item && !loadin) {
    return (
      <div className={styles.error}>
        Товар не найден
        {loadin && <Loader />}
      </div>
    );
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpened(false);

    if (e.key === "ArrowRight" && opened !== false) {
      const nextIndex = (Number(opened) + 1) % item.img.length;
      setOpened(`${nextIndex}`);
    } else if (e.key === "ArrowLeft" && opened !== false) {
      const prevIndex =
        (Number(opened) - 1 + item.img.length) % item.img.length;
      setOpened(`${prevIndex}`);
    }
  });

  return (
    <div className={styles.item}>
      {loadin && <Loader />}

      {opened && (
        <div className={styles.item_opened}>
          <span
            className={styles.item_opened_close}
            onClick={() => setOpened(false)}
          ></span>
          <button onClick={() => setOpened(false)}>
            <CgClose />
          </button>
          <img
            src={`${import.meta.env.VITE_APP_IMG_URL}${
              item?.img[Number(opened)]
            }`}
            alt=""
          />
          <section className={styles.item_opened_images}>
            {item?.img?.map((image: any, index: number) => (
              <img
                onClick={() => setOpened(`${index}`)}
                className={
                  opened != `${index}` ? styles.item_opened_image_inactive : ""
                }
                key={index}
                src={`${import.meta.env.VITE_APP_IMG_URL}${image}`}
                alt={`Item ${item.article}`}
              />
            ))}
          </section>
        </div>
      )}
      <a onClick={() => navigate(-1)}>
        <h1
          style={{
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          className="element-animation el"
        >
          <FaArrowLeft /> {t("backToCatalog")}
        </h1>
      </a>
      <h1 className={`element-animation el`}>
        {t("article")}: {item?.article}
      </h1>
      <div className={styles.item_info}>
        <div
          className={styles.item_images}
          style={{
            gridTemplateColumns:
              item?.img?.length == 1 ? "repeat(1, 400px)" : "",
          }}
        >
          {item?.img?.map((image: any, index: number) => (
            <img
              onClick={() => setOpened(`${index}`)}
              className={`element-animation  ${styles.item_image}`}
              key={index}
              src={`${import.meta.env.VITE_APP_IMG_URL}${image}`}
              alt={`Item ${item.art}`}
            />
          ))}
        </div>
        <div className={`element-animation er ${styles.item_details}`}>
          {item?.type == 1 ? (
            <>
              <h1>
                {t("productName")} {item.name}
              </h1>
              <h2>
                {t("bedroomsCount")} {t(item.size)}
              </h2>
              <h2>
                {t("pillowcaseSize")}
                {`${item.pillowcaseSize} (${item.pillowcases}${t(
                  "pillowcaseCountUnit"
                )})`}
              </h2>
              <h2>
                {t("sheetSize")} {item.bedsheetSize}
              </h2>
              <h2>
                {t("duvetCoverSize")} {item.duvetCoverSize}
              </h2>
              <h2>
                {t("material")} {t(item?.cloth)}
              </h2>
              <h2>
                {t("countryOfOrigin")} {t("countryName")}
              </h2>
            </>
          ) : (
            <>
              <h2>
                {t("fabricWidth_label")} {item?.width}
                {t("fabricWidth_unit")}
              </h2>
              <h2>
                {t("fabricLength_label")} {t("fabricLength_value")}
              </h2>
              <h2>
                {t("fabricWeight_label")} {item?.weight}{" "}
                {t("fabricWeight_value")}
              </h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
