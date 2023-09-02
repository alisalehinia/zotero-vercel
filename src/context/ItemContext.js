import { createContext, useContext, useState } from "react";


export const ItemContext = createContext();
export const useItemContext = () => useContext(ItemContext);

export const ItemProvider = ({ children }) => {

    const [items, setItems] = useState([]);

    const values = { items, setItems };

    return <ItemContext.Provider value={values}>
        {children}
    </ItemContext.Provider>
}