import { TConfirmationModalProps } from "../../../types/types.data";

const ConfirmationModal = ({
  isOpen,
  text,
  onConfirm,
  onCancel,
}: TConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-80">
        <p className="text-center text-lg mb-6">{text}</p>
        <div className="flex justify-center gap-6">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={onConfirm}
          >
            Да
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onCancel}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
