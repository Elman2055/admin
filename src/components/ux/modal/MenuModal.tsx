import { FaTimes } from "react-icons/fa";
import { TMenuModal } from "../../../types/types.data";
import { useNavigate } from "react-router-dom";

const MenuModal = ({ isOpen, setIsOpen, onOpenAddModal }: TMenuModal) => {
  const navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 w-full h-[100vh] flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm font-jost z-20"
          onClick={() => setIsOpen(false)}
        >
          <div className="w-[30%] desktop:w-[22%] bg-[#141414] p-4 text-white z-50">
            <FaTimes className="text-2xl desktop2:text-4xl cursor-pointer" onClick={() => setIsOpen(false)} />
            <div className="my-20 flex flex-col items-center space-y-4 text-2xl desktop2:text-4xl font-semibold">
              <p className="cursor-pointer hover:text-gray-300" onClick={onOpenAddModal}>Добавить запись</p>
              <p className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/admin/transport')}>Транспорт</p>
              <p className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/admin/spares')}>Запчасти</p>
              <p className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/admin/blog')}>Блог</p>
              <p className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/admin/categories')}>Категории</p>
              <p className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/admin/prices')}>Цены</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuModal;
