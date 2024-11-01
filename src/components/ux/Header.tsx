import { HiMiniBars3 } from "react-icons/hi2";
import logo from "../../../public/logo.png";
import MenuModal from "./modal/MenuModal";
import { useState } from "react";
import AddProductModal from "./modal/AddProductModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAddModal, setIsAddModal] = useState<boolean>(false);

  return (
    <>
      <MenuModal isOpen={isOpen} setIsOpen={setIsOpen} onOpenAddModal={() => setIsAddModal(true)}/>
      <AddProductModal isOpen={isAddModal} setIsOpen={setIsAddModal}/>
      <div className="flex justify-between items-center p-3 text-white">
        <img src={logo} alt="logo" className="w-[10%] desktop:w-[8%] object-cover" />
        <div className="flex items-center gap-2">
          <p className="font-bold desktop2:text-lg">ADMIN</p>
          <HiMiniBars3
            className="text-2xl desktop:text-2xl desktop2:text-3xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
