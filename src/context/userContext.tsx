import { useState, createContext, ReactNode, useContext } from "react";

interface UserContextValue {
  id: string;
  email: string;
  token:string;
  name:string,
  setId: (id: string) => void;
  setEmail: (email: string) => void;
  setToken:(token: string) => void;
  setName:(name: string) => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

const userContextDefaultValue: UserContextValue = {
  id: "",
  email: "",
  token:"",
  name:"",
  setId: () => {},
  setEmail: () => {},
  setToken: () => {},
  setName: () => {},
};

export const UserContext = createContext<UserContextValue>(userContextDefaultValue);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [name, setName] = useState<string>("");

  const value: UserContextValue = {
    id,
    email,
    token,
    name,
    setId,
    setEmail,
    setToken,
    setName,
  };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;

// Custom hook to use the UserContext in other components
export const useUserContext = () => {
  return useContext(UserContext);
};
