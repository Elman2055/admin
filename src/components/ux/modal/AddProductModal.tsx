import { FaTimes } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { TAddModal, TCategories } from "../../../types/types.data";
import AdminApi from "../../../services/adminApi";
import { useAppContext } from "../../AppContext";
import Loader from "../../ui/Loader";
import ConfirmationModal from "./ConfirmModal";

const AddProductModal = ({
  isOpen,
  setIsOpen,
  titleValue,
  priceValue,
  descriptionValue,
  imageValue,
  active,
  isEdit,
  editID,
}: TAddModal) => {
  const [images, setImages] = useState<string[]>([]);
  const categories = [
    { label: "Транспорт", value: "transport" },
    { label: "Блог", value: "blog" },
    { label: "Запчасти", value: "spares" }
  ];

  const [dropMenuCategories, setDropMenuCategories] = useState<TCategories[]>([]);
  const [activeBtn, setActiveBtn] = useState<number>(categories.findIndex(c => c.value === active) || 0);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<FormData | null>(null);
  const { loadPage, setLoadPage } = useAppContext();

  useEffect(() => {
    fetchCategories();
  }, [activeBtn]);

  const fetchCategories = async () => {
    try {
      const type = categories[activeBtn].value; // Get type based on active button
      const responseJson = await AdminApi.getCategories('categories', type);

      if (responseJson.success) {
        setDropMenuCategories(responseJson.categories);
      }
    } catch (error) {
      console.log("fetch categories: ", error);
    }
  }

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
    setEditFormData(formData);

    if (!isEdit) {
      const data = await AdminApi.onAddProducts( `${ activeBtn === 0 ? "transport" : activeBtn === 1 ? "blog" : "spares" }`, formData );
      data.success ? setIsOpen(false) : setError(data.message);
    } else {
      setIsConfirm(true);
    }

    setLoadPage(!loadPage);
    setLoader(false);
    setImages([]);
    target.reset();
  };

  const onConfirmEdit = async () => {
    setLoader(true);
    const data = await AdminApi.onEdit( `${activeBtn === 0 ? "transport" : activeBtn === 1 ? "blog" : "spares"}`, editID as number, editFormData as FormData );
    data.success ? setIsOpen(false) : setError(data.message);
    setIsConfirm(false);
    setLoadPage(!loadPage);
    setLoader(false);
  };

  return (
    <>
      <Loader isOpen={loader} />
      {isOpen && (
        <>
          <ConfirmationModal isOpen={isConfirm} text="Вы действительно хотите изменить продукт?" onConfirm={() => onConfirmEdit()} onCancel={() => setIsConfirm(false)} />
          <div
            className="fixed top-0 w-full h-[100vh] flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm font-jost z-20"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-[#141414] p-5 text-white relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <FaTimes
                className="absolute top-6 left-5 text-2xl desktop:text-3xl desktop2:text-4xl cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
              <p className="text-2xl desktop:text-3xl desktop2:text-4xl">
                {isEdit ? "Редактировать запись" : "Добавить запись"}
              </p>
              <div className="flex justify-center gap-3 my-4">
                {["Транспорт", "Блог", "Запчасти"].map((el, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 text-black bg-white desktop2:text-xl rounded-lg ${activeBtn === index ? "" : "opacity-40"}`}
                    onClick={() => setActiveBtn(index)}
                  >
                    {el}
                  </button>
                ))}
              </div>
              <form className="flex flex-col gap-3" onSubmit={onSubmit}>
                <div className={`w-[35vw] desktop:w-[27vw] h-[25vh] border-2 border-white rounded-lg flex items-center justify-center cursor-pointer mb-5 relative ${ images.length > 0 || imageValue ? "border-none" : "border-dashed" }`} >
                  {images.length > 0 || imageValue ? (
                    <>
                      {images.length > 0 ? (
                        images.map((image, index) => (
                          <img key={index} src={image} alt={`Uploaded ${index}`} className="w-full h-full object-cover rounded-lg" />
                        ))
                      ) : (
                        <img src={`https://batyssp.kz/api/v1/${active}/preview/${imageValue}`} alt="product" className="w-full h-full object-cover rounded-lg" />
                      )}
                    </>
                  ) : (
                    <div className="bg-white rounded-full p-3"><CiImageOn className="text-4xl text-gray-400" /></div>
                  )}
                  <input type="file" accept="image/*" name="image" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                </div>
                {(activeBtn !== 1 ? ["title", "price", "category", "description"] : ["title", "description"] ).map((el, index) => (
                  <input
                    key={index}
                    type="text"
                    name={el}
                    placeholder={ el === "title" ? "Название" : el === "price" ? "Цена" : el === "category" ? "Категория" : "Описание" }
                    defaultValue={el === "title"? titleValue: el === "price"? priceValue: el === "category"? categoryValue: descriptionValue}
                    className={`bg-transparent border-b-2 border-gray-500 focus:border-white outline-none desktop2:text-xl py-1 ${el === "description" ? "pb-10" : ""}`}
                  />
                ))}
                {error && ( <p className="text-red-500 desktop2:text-xl text-center"> {error} </p> )}
                <button type="submit" className="bg-white text-black py-2 desktop2:text-xl" >
                  {isEdit ? "Редактировать" : "Добавить"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProductModal;