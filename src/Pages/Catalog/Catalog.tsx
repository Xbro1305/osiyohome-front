import styles from "./Catalog.module.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../widgets/Loader/Loader";
import { useTranslation } from "react-i18next";
import { runIntersectionAnimation } from "../../widgets/Animation";

export const Catalog = () => {
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const titleElement = document?.querySelector("title");
    if (titleElement) titleElement.innerText = "Каталог - Osiyo Home Tex";

    setLoading(true);
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const url =
      type == "fabrics"
        ? `${baseUrl}/categories?applies_to=0`
        : `${baseUrl}/categories?applies_to=1`;

    axios(url)
      .then((res) => setData(res.data.innerData))
      .catch((err) => toast.error(err.response.data.msg))
      .finally(() => setLoading(false));
  }, [type]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        runIntersectionAnimation();
      }, 100);
    }
  }, [loading]);

  return (
    <div className={styles.catalog}>
      {loading && <Loader />}
      <h1 className={`element-animation el ${styles.catalog_title}`}>
        {type == "fabrics" ? t("fabrics_title") : t("beddingSets_title")}
      </h1>
      <div className={styles.catalog_items}>
        {data.map((item: any, index) => (
          <Link
            to={`/catalog/category/${item.categoryId}`}
            key={index}
            className={`${styles.catalog_item}`}
          >
            <img className="element-animation" src={item.preview} alt="" />
            <h2 className={`element-animation eb ${styles.catalog_item_title}`}>
              {t(item.keyword)}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
