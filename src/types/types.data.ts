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
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};
