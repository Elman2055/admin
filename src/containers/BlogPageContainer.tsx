import { useEffect, useRef, useState } from "react";
import AdminApi from "../services/adminApi";
import { TProducts } from "../types/types.data";
import { useAppContext } from "../components/AppContext";
import Loader from "../components/ui/Loader";
import PageList from "../components/ux/PageList";

const BlogPageContainer = () => {
  const [products, setProducts] = useState<TProducts[]>([]);
  const [oldValues, setOldValues] = useState({
    image: "",
    title: "",
    price: "",
    category: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>("");
  const [currentId, setCurrentId] = useState<number>(0);
  const { loadPage, setLoadPage } = useAppContext();

  const getProducts = async (page: number) => {
    setLoader(true);
    const data = await AdminApi.getProducts("blog", page);
    if (data) {
      try {
        setTotalPages(data.totalPages);
        setQuantity(data.totalCount || 0);
        const filtered = data.blogs.filter((el: TProducts) =>
          el.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setProducts(filtered);
      } catch (e) {
        setLoader(false);
      }
    }
    setLoader(false);
  };

  const onDelete = async () => {
    setLoader(true);
    await AdminApi.onDelete("blog", currentId);
    setLoadPage(!loadPage);
    setLoader(false);
    setIsConfirm(false);
  };

  const onEdit = async (id: number) => {
    setLoader(true);
    setIsEditing(true);

    const data = await AdminApi.getProduct("blog", id);
    if (data) {
      const { photo_preview: image, title, price, category, description } = data.blog[0];
      setOldValues({ image, title, price, category, description });
    }

    setIsEditing(false);
    setLoader(false);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => getProducts(currentPage), 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [currentPage, searchValue, loadPage]);

  return (
    <>
      <Loader isOpen={loader} />
      <PageList
        title="Блог"
        image="blog"
        isDate={true}
        quantity={quantity}
        products={products}
        totalPages={totalPages}
        currentPage={currentPage}
        titleValue={isEditing ? "" : oldValues.title}
        priceValue={isEditing ? "" : oldValues.price}
        categoryValue={isEditing ? "" : oldValues.category}
        descriptionValue={isEditing ? "" : oldValues.description}
        imageValue={isEditing ? "" : oldValues.image}
        isConfirm={isConfirm}
        confirmText={confirmText}
        setCurrentPage={setCurrentPage}
        setSearchValue={setSearchValue}
        onDelete={(id) => { setConfirmText("Вы действительно хотите удалить продукт ?"); setIsConfirm(true); setCurrentId(id); }}
        onEdit={onEdit}
        onConfirm={onDelete}
        onCancel={() => setIsConfirm(false)}
      />
    </>
  );
};

export default BlogPageContainer;
