import { createContext, useEffect, useState } from 'react';
import User from '../models/User';
import APIClient from '../apis/APIClient';
import UserAPI from '../apis/UserAPI';

const initialAppState = {
    user: null as User | null,
    token: '' as string | null,
    setToken: (_token: string | null) => {},
    setUser: (_user: User | null) => {}
}

export const AppContext = createContext(initialAppState);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const apiClient = new APIClient();
  const userClient = new UserAPI(apiClient);

  const fetchUser = async () => { 
    try {
        const currentUser = await userClient.getUser();
        if (currentUser) {
            setUser(currentUser);
        } else {
            setUser(null)
        }
      } catch {
        localStorage.removeItem('token');
        setToken(null);
      }
  }

  useEffect(() => {
    if (token) {
        fetchUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};