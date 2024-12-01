import { CiSearch } from "react-icons/ci";
import { TPages } from "../../types/types.data";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import Pagination from "@mui/material/Pagination/Pagination";
import { useState } from "react";
import AddProductModal from "./modal/AddProductModal";
import ConfirmationModal from "./modal/ConfirmModal";

const PageList = ({
  title,
  quantity,
  image,
  products,
  totalPages,
  currentPage,
  isDate,
  titleValue,
  priceValue,
  categoryValue,
  descriptionValue,
  imageValue,
  isConfirm,
  confirmText,
  setCurrentPage,
  setSearchValue,
  onDelete,
  onEdit,
  onConfirm,
  onCancel,
}: TPages) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>();

  return (
    <>
      <AddProductModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        titleValue={titleValue}
        priceValue={priceValue}
        categoryValue={categoryValue}
        descriptionValue={descriptionValue}
        imageValue={imageValue}
        active={image}
        editID={editId}
        isEdit={editId ? true : false}
      />
      <ConfirmationModal
        isOpen={isConfirm}
        text={confirmText}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <div className="w-[90%] desktop:w-[75%] mx-auto font-jost">
        <p className="text-center text-white text-2xl desktop2:text-4xl">
          {title}
          <span className="text-gray-400 text-base desktop:text-xl ml-2">
            всего {quantity} шт.
          </span>
        </p>
        <div className="flex justify-center my-5">
          <div className="w-[30%] relative">
            <input
              type="text"
              placeholder="Введите запрос"
              className="w-full bg-transparent border border-bg-white outline-none py-2 pl-10 text-white rounded-lg desktop2:text-2xl"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <CiSearch className="absolute top-1 left-1 text-white text-3xl desktop2:text-4xl" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {products.map((el) => (
            <div key={el.id} className="relative text-[#4bdf46]">
              <img
                src={`https://batyssp.kz/api/v1/${image}/preview/${el.photo_preview}`}
                alt="product"
                className="object-cover rounded-2xl w-full aspect-[15/9]"
              />
              <div className="w-[90%] absolute bottom-4 flex justify-between items-end ml-[5%]">
                <div>
                  <p className="text-lg desktop:text-xl desktop2:text-3xl font-bold">
                    {el.title}
                  </p>
                  {isDate && (
                    <p className="text-base desktop:text-xl desktop2:text-2xl font-bold">
                      {new Date(el.date).toLocaleString()}
                    </p>
                  )}
                  {!isDate && (
                    <p className="text-base desktop:text-xl desktop2:text-2xl">
                      {el.price} тг
                    </p>
                  )}
                </div>
                <div className="flex gap-4 text-lg desktop:text-3xl desktop2:text-4xl mb-2">
                  <AiFillDelete
                    className="cursor-pointer mr-4"
                    onClick={() => onDelete(el.id)}
                  />
                  <FaRegEdit
                    className="cursor-pointer"
                    onClick={() => {
                      setIsOpen(true);
                      onEdit(el.id);
                      setEditId(el.id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center pt-5">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              size={window.innerWidth > 1024 ? "medium" : "small"}
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root:not(.Mui-selected):not(.Mui-disabled), & .MuiPaginationItem-root.Mui-disabled":
                  { border: "1px solid white", color: "grey.500" },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PageList;