import { useState } from "react";
import { TPriceField, TPriceFormProps } from "../../types/types.data";
import AdminApi from "../../services/adminApi";

function PriceForm({ setTab }: TPriceFormProps) {
  const [data, onChangeData] = useState<TPriceField>({
    title: '',
    price: 0,
    description: ''
  });
  const [error, setError] = useState<string>('');

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    onChangeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const addPrice = async () => {
    try {
      if (data.title && data.price && data.description) {
        if (data.description.length > 1000) {
          setError('Описание более 1000 символов');
        } else {
          const responseJson = await AdminApi.addPrice('prices', {
            title: data.title,
            price: data.price,
            description: data.description
          });

          if (responseJson.success) {
            setError('');
            alert('Цена добавлена');
            window.location.reload();
          } else {
            setError(responseJson.message);
          }
        }
      } else {
        setError('Не все поля заполнены');
      }
    } catch (error) {
      console.log('add price error: ', error);
    }
  }


  return (
    <div className="flex flex-col space-y-3">
      <input
        placeholder="Название"
        className="w-96 border-b-2 border-b-white/50 py-3 text-white text-xl outline-none bg-transparent focus:border-b-white font-jost"
        name="title"
        value={data.title}
        onChange={handleChangeData}
      />
      <input
        placeholder="Цена"
        className="w-96 border-b-2 border-b-white/50 py-3 text-white text-xl outline-none bg-transparent focus:border-b-white font-jost"
        name="price"
        value={data.price}
        onChange={handleChangeData}
      />
      <div className="relative">
        <textarea
          placeholder="Описание"
          className="w-96 h-48 border-b-2 border-b-white/50 py-3 text-white text-xl outline-none bg-transparent focus:border-b-white font-jost resize-none"
          name="description"
          value={data.description}
          onChange={handleChangeData}
        />
        <p className={`absolute right-0 bottom-4 ${data.description.length > 1000 ? 'text-red-400' : 'text-white'} font-jost text-sm`}>
          {data.description.length}/1000
        </p>
      </div>
      <p className="text-lg text-red-500 font-jost font-light text-center">{error}</p>
      <button onClick={() => addPrice()} className="w-96 p-3 justify-center items-center flex bg-white rounded-xl hover:opacity-50">
        <p className="text-xl text-black font-jost">Добавить</p>
      </button>
      <button onClick={() => setTab(0)} className="w-96 p-3 ease-out duration-300 justify-center items-center flex border-2 border-white rounded-xl hover:border-red-500 group hover:bg-red-500">
        <p className="text-xl text-white font-jost">Отменить</p>
      </button>
    </div>
  );
}

export default PriceForm;
