import { CircularProgress } from "@mui/material";

const Loader = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 z-50">
          <CircularProgress size={75} color={"primary"} />
        </div>
      )}
    </>
  );
};

export default Loader;
