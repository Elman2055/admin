import { useEffect, useState } from "react";
import { IoMdClose, IoIosArrowForward } from "react-icons/io";
import { TCategories } from "../types/types.data";
import AdminApi from "../services/adminApi";
import Loader from "../components/ui/Loader";

function CategoriesPageContainer() {
  const [categories, setCategories] = useState<TCategories[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>('transport');
  const [title, onChangeTitle] = useState<string>('');
  const types = [
    { name: 'Для транспорта', slug: 'transport' },
    { name: 'Для запчастей', slug: 'spares' }
  ]

  useEffect(() => {
    fetchAllCategories();
  }, [selectedType]);

  const fetchAllCategories = async () => {
    try {
      const responseJson = await AdminApi.getCategories("categories", selectedType);
      console.log("data: ", responseJson);
      if (responseJson.success) {
        setCategories(responseJson.categories);
        setTotalCount(responseJson.totalCount);
        setIsLoad(false);
      }
    } catch (error) {
      console.log('fetch all categories: ', error);
    } finally {
      setIsLoad(false);
    }
  };

  const addCategory = async () => {
    try {
      const responseJson = await AdminApi.addCategory(
        "categories",
        {
          title: title,
          type: selectedType
        }
      );

      if (responseJson.success)
        fetchAllCategories();
      onChangeTitle('');
    } catch (error) {
      console.log('fetch add category: ', error);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const data = await AdminApi.onDelete('categories', id);

      if (data.success)
        fetchAllCategories();

    } catch (error) {
      console.log('delete category: ', error);
    }
  };

  return (
    <>
      <Loader isOpen={isLoad} />
      <div className="w-[90%] desktop:w-[75%] mx-auto font-jost space-y-3 flex flex-col justify-center items-center">
        <p className="text-center text-white text-2xl desktop2:text-4xl">
          Категории
          <span className="text-gray-400 text-base desktop:text-xl ml-2">всего {totalCount} шт.</span>
        </p>
        <div className="flex flex-row space-x-3 justify-center items-center">
          {types.map((type, index) => (
            <button
              key={index}
              disabled={type.slug === selectedType}
              className={`bg-white rounded-xl px-4 py-2 ${type.slug === selectedType ? 'opacity-50' : 'hover:opacity-50'}`}
              onClick={() => setSelectedType(type.slug)}
            >
              <p className="font-jost text-lg">{type.name}</p>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap w-[70%] flex-row justify-center items-center">
          {categories.length > 0 ? (
            <>
              {categories.map((item, index) => (
                <div key={index} className="flex flex-row space-x-2 border-2 border-white rounded-xl justify-center items-center px-2 py-2 m-1.5">
                  <p className="text-lg text-white">{item.title}</p>
                  <button
                    onClick={() => deleteCategory(item.id)}
                    className="bg-white rounded-full w-6 h-6 flex justify-center items-center group hover:bg-red-500 ease-out duration-300"
                  >
                    <IoMdClose className="text-lg text-black group-hover:text-white ease-out duration-300" />
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div className="w-full py-2">
              <div className="w-full py-2">
                <p className="text-xl font-jost text-white text-center">
                  Нет добавленных категорий{" "}
                  {types.find((type) => type.slug === selectedType)?.name.toLocaleLowerCase() || "неизвестного типа"}
                </p>
              </div>

            </div>
          )}
        </div>
        <div className="border-b-2 flex flex-row justify-between items-center py-2 m-1 space-x-1">
          <input
            className="text-lg text-white font-jost bg-transparent outline-none"
            placeholder="Название категории"
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
          />
          {title && (
            <button onClick={() => addCategory()} className="bg-white w-6 h-6 rounded-full flex items-center justify-center group hover:bg-green-400 ease-out duration-300">
              <IoIosArrowForward className="text-lg text-black group-hover:text-white ease-out duration-300" />
            </button>
          )}
        </div>
      </div>
    </>
  )
};

export default CategoriesPageContainer;