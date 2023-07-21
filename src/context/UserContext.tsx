import { createContext, useState, useContext, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from './FileContext';

interface UserContextProps {
  user: User | undefined;
  login: (username: string, password: string) => Promise<void>;
}

interface User {
  id: string;
  username: string;
  login: string;
  password: string;
}

const UserContext = createContext<UserContextProps | null>(null);

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [ user, setUser ] = useState<User>()
  const navigate = useNavigate();

  const { fetchFiles } = useFileContext()

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setUser(data.user);

      navigate('/home')
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(user) {
      fetchFiles(user.id)
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};

export { useUserContext, UserProvider };
