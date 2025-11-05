import { useCallback, useEffect, useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import { SwiperSlide, type SwiperClass } from "swiper/react";
import styles from "./Home.module.scss";
import "swiper/css";
import { useTranslation } from "react-i18next";
import { runIntersectionAnimation } from "../../widgets/Animation";

export const Carousel = ({ items }: { items: any }) => {
  const sliderRef = useRef<{ swiper: SwiperClass } | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (items)
      setTimeout(() => {
        runIntersectionAnimation();
      }, 100);
  }, [items]);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <Swiper
      className="element-animation"
      ref={sliderRef}
      modules={[Pagination]}
      spaceBetween={10}
      slidesPerView={3}
      breakpoints={{
        1440: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 2,
        },
        320: {
          slidesPerView: 1,
        },
      }}
      pagination={{
        type: "bullets",
        bulletClass: "swiper-custom-bullet",
        bulletActiveClass: "swiper-custom-bullet-active",
        clickable: true,
      }}
    >
      {items?.map((item: { article: number; img: string[] }) => (
        <SwiperSlide>
          <Link to={`/catalog/item/${item.article}`} key={item.article}>
            <div className={styles.home_categories_item}>
              {item.img && (
                <img
                  loading="lazy"
                  src={`${import.meta.env.VITE_APP_IMG_URL}${item?.img[0]}`}
                  alt={`Item ${item.article}`}
                />
              )}
              <p>
                {t("article")}: {item.article}
              </p>
              <span>{t("goTo")}</span>
            </div>
          </Link>
        </SwiperSlide>
      ))}
      <div className="prev-arrow" onClick={handlePrev}>
        <BiChevronLeft />
      </div>
      <div className="next-arrow" onClick={handleNext}>
        <BiChevronRight />
      </div>
    </Swiper>
  );
};
