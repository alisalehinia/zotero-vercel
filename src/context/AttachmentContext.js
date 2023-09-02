import { createContext, useContext, useState } from "react";


export const AttachmentContext = createContext();
export const useAttachmentContext = () => useContext(AttachmentContext);

export const AttachmentProvider = ({ children }) => {

    const [attachments, setAttachments] = useState([]);

    const values = { attachments, setAttachments };

    return <AttachmentContext.Provider value={values}>
        {children}
    </AttachmentContext.Provider>
}