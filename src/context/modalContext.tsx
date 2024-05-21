import{ useState, createContext, ReactNode } from "react";

interface ModalContextValue {
  menuOpen: boolean;
  togleMenu: () => void | null;
}

interface ModalContextProviderProps {
  children: ReactNode;
}

const modalContextDefaultValue: ModalContextValue = {
  menuOpen: false,
  togleMenu: () => null,
};

export const ModalContext = createContext(modalContextDefaultValue);



const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const togleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const value: ModalContextValue = {
    menuOpen: menuOpen,
    togleMenu: togleMenu,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
