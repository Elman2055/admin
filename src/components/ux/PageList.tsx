import { CiSearch } from "react-icons/ci";
import { TPages } from "../../types/types.data";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Pagination } from "@mui/material";
import { useState } from "react";
import AddProductModal from "./modal/AddProductModal";

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
  setCurrentPage,
  setSearchValue,
  onDelete,
  onEdit,
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
      <div className="w-[90%] desktop:w-[75%] mx-auto font-jost">
        <p className="text-center text-white text-2xl desktop2:text-4xl">
          {title}
          <span className="text-gray-400 text-base desktop:text-xl ml-2">всего {quantity} шт.</span>
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
            <div key={el.id} className="relative text-white">
              <img
                src={`https://batyssp.kz/api/v1/${image}/preview/${el.photo_preview}`}
                alt="product"
                className="object-cover rounded-2xl w-full aspect-[15/9]"
              />
              <div className="w-[90%] absolute bottom-4 flex justify-between items-end ml-[5%]">
                <div>
                  <p className="text-base desktop:text-lg desktop2:text-2xl font-bold">{el.title}</p>
                  {isDate && (<p className="text-sm desktop:text-base desktop2:text-lg">{new Date(el.date).toLocaleString()}</p>)}
                  {!isDate && (<p className="text-sm desktop:text-base desktop2:text-lg">{el.price} тг</p>)}
                </div>
                <div className="flex gap-4 text-lg desktop:text-xl desktop2:text-3xl mb-2">
                  <RiDeleteBin6Line className="cursor-pointer" onClick={() => onDelete(el.id)} />
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
              onChange={(event, value) => setCurrentPage(value)}
              size={window.innerWidth > 1024 ? "medium" : "small"}
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root:not(.Mui-selected):not(.Mui-disabled), & .MuiPaginationItem-root.Mui-disabled":
                  { border: "1px solid white", color: "grey.500" },
                "& .MuiPaginationItem-root.Mui-selected":
                  { backgroundColor: "white", color: "black", },
              }}
            />
          </div>
          )}
      </div>
    </>
  );
};

export default PageList;
