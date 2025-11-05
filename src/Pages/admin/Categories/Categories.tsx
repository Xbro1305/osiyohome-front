import { useEffect, useState } from "react";
import styles from "./Categoies.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../../widgets/Loader/Loader";
import { BiImage, BiRefresh } from "react-icons/bi";

export const AdminCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("0");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [files, setFiles] = useState<string>();
  const [editing, setEditing] = useState<any>();

  const refresh = () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (type) query.append("applies_to", type);

    const url = `${
      import.meta.env.VITE_APP_API_URL
    }/categories?${query.toString()}`;

    axios
      .get(url)
      .then((res) => setData(res.data.innerData))
      .catch((err) => toast.error(err.response?.data?.msg || "Error"))
      .finally(() => setLoading(false));
  };

  useEffect(refresh, [type]);

  return (
    <div className={styles.categories}>
      {loading && <Loader />}
      <div className={styles.categories_top}>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={() => refresh()}
        >
          Категории <BiRefresh />
        </h1>
        <section>
          <select name="type" id="" onChange={(e) => setType(e.target.value)}>
            <option value="0">Ткани</option>
            <option value="1">КПБ</option>
          </select>
          <button onClick={() => setIsOpen(true)}>
            + Добавить новую категорию
          </button>
        </section>
      </div>
      <div className={styles.categories_list}>
        {data.map((item: any, index: number) => (
          <div
            onClick={() => {
              setEditing(item);
              setFiles(item.preview);
            }}
            key={index}
            className={styles.categories_list_item}
          >
            <img src={item.preview} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_body}>
            <button
              onClick={() => {
                setIsOpen(false);
                setFiles("");
              }}
            >
              &times;
            </button>
            <form
              onSubmit={(e) => {
                setLoading(true);
                e.preventDefault();
                const formdata = new FormData(e.target as HTMLFormElement);
                const value = Object.fromEntries(formdata);
                console.log(value);
                console.log(files);
                const token = localStorage.getItem("token");

                axios(`${import.meta.env.VITE_APP_API_URL}/categories/create`, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  data: { ...value, preview: files },
                })
                  .then(() => {
                    toast.success("Успешно сохранено");
                    refresh();
                  })
                  .catch((err) =>
                    toast.error(err.response?.data?.msg || "Error")
                  )
                  .finally(() => setLoading(false));
              }}
            >
              <h1>Создать новую категорию</h1>
              <label>
                <p>Название</p>
                <input type="text" name="name" />
              </label>{" "}
              <label>
                <p>Ключевое слово</p>
                <input type="text" name="keyword" />
              </label>
              <label className={styles.modal_photoLabel}>
                <p>Фото</p>
                <section>
                  {files ? (
                    <img src={files} alt="" />
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
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (!files || files.length === 0) return;

                    const toBase64 = (file: File): Promise<string> =>
                      new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = (error) => reject(error);
                      });

                    const encodedfile = await toBase64(files[0]);

                    setFiles(encodedfile);
                  }}
                />
              </label>
              <label>
                <p>Подкатегория</p>
                <select name="applies_to">
                  <option value={0}>Ткань</option>
                  <option value={1}>КПБ</option>
                </select>
              </label>
              <button type="submit">Сохранить</button>
            </form>
          </div>
        </div>
      )}{" "}
      {editing && (
        <div className={styles.modal}>
          <div className={styles.modal_body}>
            <button
              onClick={() => {
                setEditing(false);
                setFiles("");
              }}
            >
              &times;
            </button>
            <form
              onSubmit={(e) => {
                setLoading(true);
                e.preventDefault();
                const formdata = new FormData(e.target as HTMLFormElement);
                const value = Object.fromEntries(formdata);
                console.log(value);
                console.log(files);
                const token = localStorage.getItem("token");

                axios(
                  `${import.meta.env.VITE_APP_API_URL}/categories/update/${
                    editing._id
                  }`,
                  {
                    method: "PATCH",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    data: { ...value, preview: files },
                  }
                )
                  .then(() => {
                    toast.success("Успешно сохранено");
                    refresh();
                  })
                  .catch((err) =>
                    toast.error(err.response?.data?.msg || "Error")
                  )
                  .finally(() => setLoading(false));
              }}
            >
              <h1>Редактирование категории</h1>
              <label>
                <p>Название</p>
                <input type="text" defaultValue={editing.name} name="name" />
              </label>{" "}
              <label>
                <p>Ключевое слово</p>
                <input
                  type="text"
                  defaultValue={editing.keyword}
                  name="keyword"
                />
              </label>{" "}
              <label className={styles.modal_photoLabel}>
                <p>Фото</p>
                <section>
                  {files ? (
                    <img src={files} alt="" />
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
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (!files || files.length === 0) return;

                    const toBase64 = (file: File): Promise<string> =>
                      new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = (error) => reject(error);
                      });

                    const encodedfile = await toBase64(files[0]);

                    setFiles(encodedfile);
                  }}
                />
              </label>
              <label>
                <p>Подкатегория</p>
                <select defaultValue={editing.applies_to} name="applies_to">
                  <option value={0}>Ткань</option>
                  <option value={1}>КПБ</option>
                </select>
              </label>
              <section>
                <button
                  type="button"
                  onClick={() => {
                    const confirm = window.confirm(
                      "Вы уверены, что хотите удалить этот товар?"
                    );

                    if (!confirm) return;

                    setLoading(true);
                    const token = localStorage.getItem("token");

                    axios(
                      `${import.meta.env.VITE_APP_API_URL}/categories/delete/${
                        editing._id
                      }`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                      .then((res) => {
                        refresh();
                        setFiles("");
                        setEditing(false);
                        toast.success(res.data.msg);
                      })
                      .catch((err) => toast.error(err.response.data.msg))
                      .finally(() => setLoading(false));
                  }}
                >
                  Удалить
                </button>
                <button type="submit">Сохранить</button>
              </section>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
