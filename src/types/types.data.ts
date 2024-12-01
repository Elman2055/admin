export type TMenuModal = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenAddModal: VoidFunction;
};

export type TAddModal = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  titleValue?: string;
  priceValue?: string;
  categoryValue?: string;
  descriptionValue?: string;
  imageValue?: string;
  active?: string;
  isEdit?: boolean;
  editID?: number;
};

export type TProducts = {
  date: string;
  description: string;
  id: number;
  photo_preview: string;
  title: string;
  price?: string;
  category?: string;
};

export type TCategories = {
  id: number,
  title: string,
  type: string
};

export type TTypes = {
  name: string,
  slug: string
};

export type TPriceField = {
  title: string,
  price: number,
  description: string
}

export type TPages = {
  title?: string;
  quantity: number;
  image?: string;
  products: TProducts[];
  totalPages: number;
  currentPage: number;
  isDate?: boolean;
  titleValue: string;
  priceValue: string;
  categoryValue: string;
  descriptionValue: string;
  imageValue?: string;
  isConfirm: boolean;
  confirmText: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export type TPriceFormProps = {
  setTab: (tab: number) => void;
};

export type TPriceCard = {
  onDelete: (id: number) => void;
  data: TPrice;
};

export type TPrice = {
  id: number,
  title: string,
  price: number,
  description: string
};

export type TConfirmationModalProps = {
  isOpen: boolean;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const mockEvent = {
  preventDefault: () => { },
  currentTarget: document.createElement("form"),
} as React.ChangeEvent<HTMLFormElement>;
