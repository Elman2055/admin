import { useEffect, useState } from "react";
import PriceCard from "../components/ui/PriceCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PriceForm from "../components/ui/PriceForm";
import { TPrice } from "../types/types.data";
import AdminApi from "../services/adminApi";
import Loader from "../components/ui/Loader";

function PricesPageContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tab, setTab] = useState<number>(0);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [prices, setPrices] = useState<TPrice[]>([]);

  // Определяем, сколько слайдов показывать на экране
  const visibleSlides = 4;

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      setIsLoad(true)
      const responseJson = await AdminApi.getPrices('prices');

      if (responseJson.success) {
        setPrices(responseJson.prices);
        setIsLoad(false)
      }
    } catch (error) {
      console.log("fetch prices: ", error);
    } finally {
      setIsLoad(false);
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + visibleSlides < prices.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + visibleSlides >= prices.length;

  const onDelete = async (id: number) => {
    try {
      const data = await AdminApi.onDelete('prices', id);

      if (data.success) {
        fetchPrices();
      }
    } catch (error) {
      console.log('delete price error: ', error);
    }
  }

  return (
    <>
      <Loader isOpen={isLoad} />
      <div className="w-[90%] desktop:w-[75%] mx-auto font-jost space-y-3 flex flex-col justify-center items-center">
        <p className="text-center text-white text-2xl desktop2:text-4xl">
          {tab === 0 ? 'Цены' : 'Добавить цену'}
          {tab === 0 && (
            <span className="text-gray-400 text-base desktop:text-xl ml-2">
              всего {prices.length} шт.
            </span>
          )}
        </p>
        {tab === 0 && (
          <>
            {prices.length > 0 ? (
              <div className="flex flex-row space-x-3 justify-center items-center">
                <button
                  onClick={handlePrev}
                  className={`w-12 h-12 flex-shrink-0 border-2 border-white rounded-full flex justify-center items-center group hover:bg-white ease-out duration-300 ${isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={isPrevDisabled}
                >
                  <IoIosArrowBack className="text-xl text-white group-hover:text-black ease-out duration-300" />
                </button>

                <div className="relative overflow-hidden w-full max-w-[1320px]">
                  <div
                    className="flex space-x-3 transition-transform duration-500 ease-out"
                    style={{
                      transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
                    }}
                  >
                    {prices.map((price, index) => (
                      <div key={index} className="flex-shrink-0">
                        <PriceCard
                          onDelete={onDelete}
                          data={price}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className={`w-12 h-12 flex-shrink-0 border-2 border-white rounded-full flex justify-center items-center group hover:bg-white ease-out duration-300 ${isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={isNextDisabled}
                >
                  <IoIosArrowForward className="text-xl text-white group-hover:text-black ease-out duration-300" />
                </button>
              </div>
            ) : (
              <div className="w-full">
                <p className="text-xl text-center text-white">Нет добавленных цен</p>
              </div>
            )}
            <div>
              <button onClick={() => setTab(1)} className="bg-white rounded-xl px-6 py-2 justify-center items-center flex hover:opacity-50">
                <p className="text-xl text-black">Добавить цену</p>
              </button>
            </div>
          </>
        )}
        {tab === 1 && <PriceForm setTab={() => setTab(0)} />}
      </div>

    </>
  );
}

export default PricesPageContainer;
