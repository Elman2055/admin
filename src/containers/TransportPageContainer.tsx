import { useEffect, useRef, useState } from "react";
import AdminApi from "../services/adminApi";
import { TProducts } from "../types/types.data";
import { useAppContext } from "../components/AppContext";
import Loader from "../components/ui/Loader";
import PageList from "../components/ux/PageList";

const TransportPageContainer = () => {
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
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const { loadPage, setLoadPage } = useAppContext();

  const getProducts = async (page: number) => {
    setLoader(true);
    const data = await AdminApi.getProducts("transport", page);
    if (data) {
      try {
        setTotalPages(data.totalPages);
        setQuantity(data.totalCount || 0);
        const filtered = data.transports.filter((el: TProducts) => {
          return el.title.toLowerCase().includes(searchValue.toLowerCase());
        });
        setProducts(filtered);
      } catch (e) {
        setLoader(false);
      }
    }
    setLoader(false);
  };

  const onDelete = async (id: number) => {
    setLoader(true);
    await AdminApi.onDelete("transport", id);
    setLoadPage(!loadPage);
    setLoader(false);
  };

  const onEdit = async (id: number) => {
    setLoader(true);
    const data = await AdminApi.getProduct("transport", id);

    if (data) {
      const values = data.transports.map((el: TProducts) => ({
        image: el.photo_preview,
        title: el.title,
        price: el.price,
        category: el.category,
        description: el.description,
      }))[0];
      setOldValues(values);
    }
    setLoadPage(!loadPage);
    setLoader(false);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      getProducts(currentPage);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [currentPage, searchValue, loadPage]);

  return (
    <>
      <Loader isOpen={loader} />
      <PageList
        title="Транспорт"
        image="transport"
        quantity={quantity}
        products={products}
        totalPages={totalPages}
        currentPage={currentPage}
        titleValue={oldValues.title}
        priceValue={oldValues.price}
        categoryValue={oldValues.category}
        descriptionValue={oldValues.description}
        imageValue={oldValues.image}
        setCurrentPage={setCurrentPage}
        setSearchValue={setSearchValue}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </>
  );
};

export default TransportPageContainer;
