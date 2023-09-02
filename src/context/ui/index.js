import { createContext, useContext, useState } from "react";


export const UIContext = createContext();
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCollection, setSelectedCollection] = useState(null)
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedLibrary, setSelectedLibrary] = useState(null)

    const value = {
        drawerOpen, setDrawerOpen,
        showSearchBox, setShowSearchBox,
        selectedItem, setSelectedItem,
        selectedCollection, setSelectedCollection,
        selectedTag, setSelectedTag,
        selectedLibrary, setSelectedLibrary
    }

    return <UIContext.Provider value={value}>
        {children}
    </UIContext.Provider>
}