import { createContext, useContext, useState } from "react";


export const LibraryContext = createContext();
export const useLibraryContext = () => useContext(LibraryContext);

export const LibraryProvider = ({ children }) => {

    const [libraries, setLibraries] = useState([]);

    const values = { libraries, setLibraries };

    return <LibraryContext.Provider value={values}>
        {children}
    </LibraryContext.Provider>
}