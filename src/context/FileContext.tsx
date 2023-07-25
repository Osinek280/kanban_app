import { createContext, useState, useContext, PropsWithChildren } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  subtasks: string[];
}

interface File {
  id: string;
  name: string;
  ownerId: string;
  sections: string[];
  tasks: Task[];
}

interface FileContextProps {
  fetchFiles: (userId: string) => Promise<void>;
  files: File[];
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const FileContext = createContext<FileContextProps | null>(null);

const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileContextProvider');
  }
  return context;
};

const FileProvider = ({ children }: PropsWithChildren) => {
  const [files, setFiles] = useState<File[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  async function fetchFiles(userId: string) {
    try {
      const response = await fetch(`${process.env.API_URL}/files`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      console.log(data);
      setFiles(data.userFiles);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <FileContext.Provider value={{ files, fetchFiles, searchValue, setSearchValue }}>
      {children}
    </FileContext.Provider>
  );
};

export { useFileContext, FileProvider };
