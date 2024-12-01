import { RiDeleteBin6Line } from "react-icons/ri";
import { TPriceCard } from "../../types/types.data";

function PriceCard({ onDelete, data }: TPriceCard) {
  return (
    <div className="w-80 h-[500px] bg-white rounded-3xl overflow-auto relative flex flex-col items-center justify-center space-y-1">
      {/* Верхний левый блок */}
      <div onClick={() => onDelete(data.id)} className="w-16 h-16 bg-white rounded-br-full absolute z-10 top-0 left-0 flex justify-start items-start p-3 bg-gradient-to-tl from-[#141414] to-white">
        <button className="hover:opacity-50">
          <RiDeleteBin6Line className="text-2xl text-white" />
        </button>
      </div>
      <p className="text-2xl font-jost text-black">{data.title}</p>
      <p className="text-3xl font-jost font-semibold text-black">
        {data.price}тг
      </p>
      <p className="text-sm px-6 text-left font-jost text-black">
        {data.description}
      </p>
    </div>
  );
};

export default PriceCard;
