import { useEffect, useState } from "react";
import styles from "./Items.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../../widgets/Loader/Loader";
import { BiImage, BiRefresh } from "react-icons/bi";

export const AdminItems = () => {
  const [article, setArticle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("0");
  const [loading, setLoading] = useState(true);
  const [creatingType, setCreatingType] = useState(0);
  const [data, setData] = useState([]);
  const [files, setFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState<any>([]);
  const [editing, setEditing] = useState<any>();

  useEffect(() => {
    axios(`${import.meta.env.VITE_APP_API_URL}/categories`)
      .then((res) => setCategories(res.data.innerData))
      .catch((err) => toast.error(err.response.data.msg));
  }, []);

  const refresh = () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (article) query.append("article", article);
    if (type) query.append("type", type);

    const url = `${
      import.meta.env.VITE_APP_API_URL
    }/products?${query.toString()}`;

    axios
      .get(url)
      .then((res) => setData(res.data.innerData))
      .catch((err) => toast.error(err.response?.data?.msg || "Error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timeout = setTimeout(() => refresh(), 500);
    return () => clearTimeout(timeout);
  }, [article]);

  return (
    <div className={styles.items}>
      {loading && <Loader />}
      <div className={styles.items_top}>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={() => refresh()}
        >
          Товары <BiRefresh />
        </h1>
        <section>
          <input
            type="text"
            name="article"
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            placeholder="Артикул"
          />
          <select
            name="type"
            id=""
            onChange={(e) => {
              setType(e.target.value);
              setLoading(true);
              const query = new URLSearchParams();
              if (article) query.append("article", article);
              query.append("type", e.target.value);

              const url = `${
                import.meta.env.VITE_APP_API_URL
              }/products?${query.toString()}`;

              axios
                .get(url)
                .then((res) => setData(res.data.innerData))
                .catch((err) => toast.error(err.response?.data?.msg || "Error"))
                .finally(() => setLoading(false));
            }}
          >
            <option value="0">Ткани</option>
            <option value="1">КПБ</option>
          </select>
          <button
            onClick={() => {
              setIsOpen(true);
              setCreatingType(0);
            }}
          >
            + Добавить новый товар
          </button>
        </section>
      </div>
      <div className={styles.items_list}>
        {data.map((item: any, index: number) => (
          <div
            onClick={() => {
              setCreatingType(item.type);
              setEditing(item);
              setFiles(item.img);
            }}
            key={index}
            className={styles.items_list_item}
          >
            <img
              src={`${import.meta.env.VITE_APP_API_URL}${item.img[0]}`}
              alt={item.name}
            />
            <p>Артикул: {item.article}</p>
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_body}>
            <button
              onClick={() => {
                setIsOpen(false);
                setFiles([]);
              }}
            >
              &times;
            </button>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);

                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                // Добавим файлы
                for (const file of files) {
                  formData.append("images", file); // "images" должно совпадать с backend .array("images")
                }

                try {
                  const res = await axios.post(
                    `${import.meta.env.VITE_APP_API_URL}/products/create`,
                    formData,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );
                  toast.success(res.data.msg);
                } catch (err: any) {
                  toast.error(
                    err?.response?.data?.msg || "Ошибка при создании"
                  );
                } finally {
                  setLoading(false);
                }
              }}
            >
              <h1>Создать новый товар</h1>

              <label>
                <p>Название</p>
                <input type="text" name="name" required />
              </label>

              <label className={styles.modal_photoLabel}>
                <p>Фото</p>
                <section
                  style={{ flexDirection: files.length ? "row" : "column" }}
                >
                  {files.length ? (
                    files.map((file, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(file)}
                        alt=""
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                    ))
                  ) : (
                    <>
                      <BiImage />
                      Нажмите, для выбора фото
                    </>
                  )}
                </section>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ appearance: "none", display: "none" }}
                  onChange={(e) => {
                    const selectedFiles = e.target.files;
                    if (!selectedFiles) return;
                    setFiles(Array.from(selectedFiles));
                  }}
                />
              </label>

              <label>
                <p>Тип товара</p>
                <select
                  onChange={(e) => setCreatingType(Number(e.target.value))}
                  name="type"
                >
                  <option value={0}>Ткань</option>
                  <option value={1}>КПБ</option>
                </select>
              </label>

              <label>
                <p>Категория</p>
                <select name="categoryId">
                  {categories
                    ?.filter((item: any) => item.applies_to === creatingType)
                    ?.map((item: any) => (
                      <option key={item.categoryId} value={item.categoryId}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </label>

              {creatingType === 0 && (
                <>
                  <label>
                    <p>Ширина ткани</p>
                    <input type="text" name="width" />
                  </label>
                  <label>
                    <p>Граммовка</p>
                    <input type="text" name="weight" />
                  </label>
                </>
              )}

              {creatingType === 1 && (
                <>
                  <label>
                    <p>Размер постели</p>
                    <input type="text" name="size" />
                  </label>
                  <label>
                    <p>Кол-во наволочек</p>
                    <input type="text" name="pillowcases" />
                  </label>
                  <label>
                    <p>Размер наволочки</p>
                    <input type="text" name="pillowcaseSize" />
                  </label>
                  <label>
                    <p>Размер простыни</p>
                    <input type="text" name="bedsheetSize" />
                  </label>
                  <label>
                    <p>Размер пододеяльника</p>
                    <input type="text" name="duvetCoverSize" />
                  </label>
                </>
              )}

              <label>
                <p>Материал</p>
                <input type="text" name="cloth" />
              </label>

              <button type="submit" disabled={loading}>
                {loading ? "Отправка..." : "Отправить"}
              </button>
            </form>
          </div>
        </div>
      )}
      {editing && (
        <div className={styles.modal}>
          <div className={styles.modal_body}>
            <button
              onClick={() => {
                setEditing(false);
                setFiles([]);
              }}
            >
              &times;
            </button>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);

                const formData = new FormData(e.target as HTMLFormElement);

                // Добавляем файлы
                for (const file of files) {
                  formData.append("images", file); // Название должно совпадать с backend
                }

                try {
                  const res = await axios.patch(
                    `${import.meta.env.VITE_APP_API_URL}/products/update/${
                      editing._id
                    }`,
                    formData,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );
                  toast.success(res.data.msg);
                } catch (err: any) {
                  toast.error(
                    err?.response?.data?.msg || "Ошибка при обновлении"
                  );
                } finally {
                  setLoading(false);
                }
              }}
            >
              <h1>Редактирование товара</h1>
              <label>
                <p>Название</p>
                <input
                  required
                  defaultValue={editing.name}
                  type="text"
                  name="name"
                />
              </label>

              <label className={styles.modal_photoLabel}>
                <p>Фото</p>
                <section
                  style={{ flexDirection: files.length ? "row" : "column" }}
                >
                  {files.length ? (
                    files.map((file, i) => {
                      const src =
                        typeof file === "string"
                          ? `${import.meta.env.VITE_APP_API_URL}${file}` // если это строка — добавим базовый URL
                          : URL.createObjectURL(file); // если это File

                      return (
                        <img
                          key={i}
                          src={src}
                          alt=""
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                      );
                    })
                  ) : (
                    <>
                      <BiImage />
                      Нажмите, для выбора фото
                    </>
                  )}
                </section>
                <input
                  style={{ appearance: "none", display: "none" }}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const selected = e.target.files;
                    if (!selected) return;
                    setFiles(Array.from(selected));
                  }}
                />
              </label>

              <label>
                <p>Тип товара</p>
                <select
                  onChange={(e) => setCreatingType(Number(e.target.value))}
                  value={creatingType}
                  name="type"
                >
                  <option value={0}>Ткань</option>
                  <option value={1}>КПБ</option>
                </select>
              </label>

              <label>
                <p>Категория</p>
                <select defaultValue={editing.categoryId} name="categoryId">
                  {categories
                    ?.filter((item: any) => item.applies_to == creatingType)
                    ?.map((item: any) => (
                      <option key={item.categoryId} value={item.categoryId}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </label>

              {creatingType === 0 && (
                <>
                  <label>
                    <p>Ширина ткани</p>
                    <input
                      required
                      type="text"
                      name="width"
                      defaultValue={editing.width}
                    />
                  </label>
                  <label>
                    <p>Граммовка</p>
                    <input
                      required
                      type="text"
                      name="weight"
                      defaultValue={editing.weight}
                    />
                  </label>
                </>
              )}

              {creatingType === 1 && (
                <>
                  <label>
                    <p>Размер постели</p>
                    <input
                      required
                      type="text"
                      name="size"
                      defaultValue={editing.size}
                    />
                  </label>
                  <label>
                    <p>Кол-во наволочек</p>
                    <input
                      required
                      type="text"
                      name="pillowcases"
                      defaultValue={editing.pillowcases}
                    />
                  </label>
                  <label>
                    <p>Размер наволочки</p>
                    <input
                      required
                      type="text"
                      name="pillowcaseSize"
                      defaultValue={editing.pillowcaseSize}
                    />
                  </label>
                  <label>
                    <p>Размер простыни</p>
                    <input
                      required
                      type="text"
                      name="bedsheetSize"
                      defaultValue={editing.bedsheetSize}
                    />
                  </label>
                  <label>
                    <p>Размер пододеяльника</p>
                    <input
                      required
                      type="text"
                      name="duvetCoverSize"
                      defaultValue={editing.duvetCoverSize}
                    />
                  </label>
                </>
              )}

              <label>
                <p>Материал</p>
                <input
                  required
                  type="text"
                  name="cloth"
                  defaultValue={editing.cloth}
                />
              </label>

              <section>
                <button
                  type="button"
                  onClick={() => {
                    const confirmDelete = window.confirm(
                      "Вы уверены, что хотите удалить этот товаp?"
                    );
                    if (!confirmDelete) return;

                    setLoading(true);
                    axios
                      .delete(
                        `${import.meta.env.VITE_APP_API_URL}/products/delete/${
                          editing._id
                        }`,
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        }
                      )
                      .then((res) => {
                        toast.success(res.data.msg);
                        setFiles([]);
                        refresh();
                        setEditing(false);
                      })
                      .catch((err) => toast.error(err.response.data.msg))
                      .finally(() => setLoading(false));
                  }}
                >
                  Удалить
                </button>

                <button type="submit" disabled={loading}>
                  {loading ? "Сохранение..." : "Отправить"}
                </button>
              </section>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
