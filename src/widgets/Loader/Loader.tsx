import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1>Загрузка...</h1>
    </div>
  );
};
