import { FaTimes } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { useState } from "react";
import { TAddModal } from "../../../types/types.data";
import AdminApi from "../../../services/adminApi";
import { useAppContext } from "../../AppContext";
import Loader from "../../ui/Loader";

const AddProductModal = ({
  isOpen,
  setIsOpen,
  titleValue,
  priceValue,
  categoryValue,
  descriptionValue,
  imageValue,
  active,
  isEdit,
  editID,
}: TAddModal) => {
  const [images, setImages] = useState<string[]>([]);
  const [activeBtn, setActiveBtn] = useState<number>(
    active === "blog" ? 1 : active === "spares" ? 2 : 0
  );
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const { setLoadPage } = useAppContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(fileArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const target = e.currentTarget;
    const formData = new FormData(target);

    if (!isEdit) {
      const data = await AdminApi.onAddProducts(
        `${
          activeBtn === 0 ? "transport" : activeBtn === 1 ? "blog" : "spares"
        }`,
        formData
      );
      if (!data.success) setError(data.message);
    } else {
      const data = await AdminApi.onEdit(
        `${
          activeBtn === 0 ? "transport" : activeBtn === 1 ? "blog" : "spares"
        }`,
        editID as number,
        formData
      );
      if (!data.success) setError(data.message);
    }

    setLoader(false);
    setIsOpen(false);
    setLoadPage(true);
    setImages([]);
    target.reset();
  };

  return (
    <>
      <Loader isOpen={loader} />
      {isOpen && (
        <div
          className="fixed top-0 w-full h-[100vh] flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm font-jost z-20"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#141414] p-5 text-white relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes
              className=" absolute top-6 left-5 text-2xl desktop:text-3xl desktop2:text-4xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <p className="text-2xl desktop:text-3xl desktop2:text-4xl">
              Добавить запись
            </p>
            <div className="flex justify-center gap-3 my-4">
              {["Транспорт", "Блог", "Запчасти"].map((el, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 text-black bg-white desktop2:text-xl rounded-lg ${
                    activeBtn === index ? "" : "opacity-40"
                  }`}
                  onClick={() => setActiveBtn(index)}
                >
                  {el}
                </button>
              ))}
            </div>
            <form className="flex flex-col gap-3" onSubmit={onSubmit}>
              <div
                className={`w-[35vw] desktop:w-[27vw] h-[25vh] border-2 border-white rounded-lg flex items-center justify-center cursor-pointer mb-5 relative ${
                  images.length > 0 || imageValue
                    ? "border-none"
                    : "border-dashed"
                }`}
              >
                {images.length > 0 || imageValue ? (
                  <>
                    {images.length > 0 ? (
                      images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Uploaded ${index}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ))
                    ) : (
                      <img
                        src={`https://batyssp.kz/api/v1/${active}/preview/${imageValue}`}
                        alt="product"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </>
                ) : (
                  <div className="bg-white rounded-full p-3">
                    <CiImageOn className="text-4xl text-gray-400" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
              {(activeBtn !== 1
                ? ["title", "price", "category", "description"]
                : ["title", "description"]
              ).map((el, index) => (
                <input
                  key={index}
                  type="text"
                  name={el}
                  placeholder={
                    el === "title"
                      ? "Название"
                      : el === "price"
                      ? "Цена"
                      : el === "category"
                      ? "Категория"
                      : "Описание"
                  }
                  defaultValue={
                    el === "title"
                      ? titleValue
                      : el === "price"
                      ? priceValue
                      : el === "category"
                      ? categoryValue
                      : descriptionValue
                  }
                  className={`bg-transparent border-b-2 border-gray-500 focus:border-white outline-none desktop2:text-xl py-1 ${
                    el === "description" ? "pb-10" : ""
                  }`}
                />
              ))}
              {error && (
                <p className="text-red-500 desktop2:text-xl text-center">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="bg-white text-black py-2 desktop2:text-xl"
              >
                Добавить
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductModal;
