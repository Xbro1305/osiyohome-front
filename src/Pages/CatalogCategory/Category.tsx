import styles from "./Category.module.scss";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../widgets/Loader/Loader";
import { useTranslation } from "react-i18next";
import { runIntersectionAnimation } from "../../widgets/Animation";

interface CategoryItem {
  article: string;
  img: string[];
}

export const CatalogCategory = () => {
  const { category } = useParams();
  const [categoryItems, setCategoryItems] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const titleElement = document?.querySelector("title");
    if (titleElement) titleElement.innerText = "Каталог - Osiyo Home Tex";

    axios(`${import.meta.env.VITE_APP_API_URL}/products?categoryId=${category}`)
      .then((res) => setCategoryItems(res.data.innerData))
      .catch((err) => toast.error(err.response.data.msg))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        runIntersectionAnimation();
      }, 100);
    }
  }, [loading]);

  if (categoryItems?.length == 0)
    return <div> Не удалось найти товары этой категории</div>;

  return (
    <div className={`${styles.category}`}>
      {loading && <Loader />}

      <button
        type="button"
        className={styles.category_back_button}
        onClick={() => window.history.back()}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
        aria-label={t("backToCatalog")}
      >
        <h1
          style={{
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          className={`element-animation el ${styles.category_title}`}
        >
          <FaArrowLeft />
          {t("backToCatalog")}
        </h1>
      </button>

      <div className={styles.category_items}>
        {categoryItems?.map((item: CategoryItem, index: number) => (
          <Link
            to={`/catalog/item/${item.article}`}
            key={index}
            className={`${styles.category_item} `}
          >
            <img
              src={`${import.meta.env.VITE_APP_IMG_URL}${item?.img[0]}`}
              alt={`${t("article")}: ${item.article}`}
              className="element-animation"
              loading="lazy"
            />
            <h2
              className={`element-animation eb ${styles.category_item_title}`}
            >
              {t("article")}: {item.article}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
