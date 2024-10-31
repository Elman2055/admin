import PageList from "./ux/PageList";
import { TPages } from "../types/types.data";

const BlogPage = ({
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
      title="Блог"
      image="blog"
      isDate={true}
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

export default BlogPage;
