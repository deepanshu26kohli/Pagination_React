import React, { createContext, useContext, useState } from 'react'



const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};
const ShareData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataTransfer must be used within a DataProvider.');
    }

    return context;
}

export default ShareData
