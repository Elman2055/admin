import { useState } from "react";
import logo from "../../public/logo.png";
import AdminApi from "../services/adminApi";
import { useNavigate } from "react-router-dom";
import Loader from "./ui/Loader";

const AuthAdmin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const target = e.currentTarget;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);

    const admin = await AdminApi.onLoginAdmin(data);
    if (!admin.success) setError(admin.message);
    if (admin.success) navigate("/admin/blog");

    target.reset();
    setLoader(false);
  };

  return (
    <>
      <Loader isOpen={loader} />
      <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-7 font-jost">
        <img
          src={logo}
          alt="logo"
          className="w-[30%] desktop:w-[23%] object-cover"
        />
        <form
          className="w-[30%] desktop:w-[23%] flex flex-col gap-5 text-xl desktop2:text-3xl"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            name="login"
            placeholder="Логин"
            className="bg-transparent text-white py-2 outline-none border-b-2 border-b-gray-500 focus:border-b-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="bg-transparent text-white py-2 outline-none border-b-2 border-b-gray-500 focus:border-b-white"
          />
          {error && (
            <p className="text-center text-red-500 text-base desktop:text-lg desktop2:text-2xl">
              {error}
            </p>
          )}
          <button
            className="bg-white py-1.5 desktop2:py-3 hover:opacity-50 transition-all duration-300"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthAdmin;
