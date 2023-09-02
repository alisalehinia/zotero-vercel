import { createContext, useContext, useState } from "react";


export const CollectionContext = createContext();
export const useCollectionContext = () => useContext(CollectionContext);

export const CollectionProvider = ({ children }) => {

    const [collections, setCollections] = useState([]);

    const values = { collections, setCollections };

    return <CollectionContext.Provider value={values}>
        {children}
    </CollectionContext.Provider>
}