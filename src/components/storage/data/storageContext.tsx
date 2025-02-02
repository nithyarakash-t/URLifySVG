import React, { createContext, useContext, useEffect, useState } from "react";

export type Datum = {
  name: string;
  svg: `<svg>${string}</svg>`;
  encodedsvg?: string;
};

const STORAGE_KEY = "local-history";

type StorageContextType = {
  localHistory: Datum[];
  addToHistory: (item: Datum) => boolean;
  renameHistory: (index: number, updatedItem: Datum) => boolean;
  deleteFromHistory: (index: number) => boolean;
  clearHistory: () => void;
};

// Create the context
const StorageContext = createContext<StorageContextType | undefined>(undefined);

// Provider component
export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [localHistory, setLocalHistory] = useState<Datum[]>(getLocalStorage());

  // Load initial history from localStorage
  function getLocalStorage() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
    else return [];
  }

  // Sync history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localHistory));
  }, [localHistory]);

  // Add a new item to the history
  const addToHistory = (item: Datum) => {
    const exists = localHistory.some((historyItem) => historyItem.name === item.name);
    if (exists) {
      console.warn(`Item with name "${item.name}" already exists in history.`);
      return false; // Indicate failure to add
    }
    setLocalHistory((prev) => [...prev, item]);
    return true; // Indicate success
  };

  // Rename an existing item in the history
  const renameHistory = (index: number, updatedItem: Datum):boolean => {
    if(localHistory.some((item, i) => i !== index && item.name === updatedItem.name)) {
      return false;
    }
    setLocalHistory((prev) =>
      prev.map((item, i) => (i === index ? updatedItem : item))
    );
    return true;
  };

  // Delete an item from the history
  const deleteFromHistory = (index: number) => {
    try {
      setLocalHistory((prev) => prev.filter((_, i) => i !== index));
      return true;
    }
    catch(e) {
      console.error('error', e);
      return false;
    }
  };

  // Clear the history
  const clearHistory = () => {
    setLocalHistory([]);
  };

  return (
    <StorageContext.Provider value={{ localHistory, addToHistory, renameHistory, deleteFromHistory, clearHistory }}>
      {children}
    </StorageContext.Provider>
  );
};

// Custom hook to use the context
export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
};
