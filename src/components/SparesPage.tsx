import { TPages } from "../types/types.data";
import PageList from "./ux/PageList";

const SparesPage = ({
  quantity,
  products,
  totalPages,
  currentPage,
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
  return (
    <PageList
      title="Запчасти"
      image="spares"
      quantity={quantity}
      products={products}
      totalPages={totalPages}
      currentPage={currentPage}
      titleValue={titleValue}
      priceValue={priceValue}
      categoryValue={categoryValue}
      descriptionValue={descriptionValue}
      imageValue={imageValue}
      setCurrentPage={setCurrentPage}
      setSearchValue={setSearchValue}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
};

export default SparesPage;
