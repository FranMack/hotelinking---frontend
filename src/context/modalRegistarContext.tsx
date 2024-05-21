import{ useState, createContext, ReactNode } from "react";

interface ModalContextValue {
  menuRegisterOpen: boolean;
  togleRegisterMenu: () => void | null;
}

interface ModalContextProviderProps {
  children: ReactNode;
}

const modalContextDefaultValue: ModalContextValue = {
  menuRegisterOpen: false,
  togleRegisterMenu: () => null,
};

export const ModalRegisterContext = createContext(modalContextDefaultValue);



const ModalRegisterContextProvider = ({ children }: ModalContextProviderProps) => {
  const [menuRegisterOpen, setMenuOpen] = useState(false);

  const togleRegisterMenu = () => {
    setMenuOpen(!menuRegisterOpen);
  };

  const value: ModalContextValue = {
    menuRegisterOpen: menuRegisterOpen,
    togleRegisterMenu: togleRegisterMenu,
  };

  return (
    <ModalRegisterContext.Provider value={value}>{children}</ModalRegisterContext.Provider>
  );
};

export default ModalRegisterContextProvider;
