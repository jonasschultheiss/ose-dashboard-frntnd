import { authAPI, baseAPI } from '@utils/api';
import useQuery from '@utils/useQuery';
import JwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const getBearerHeader = accessToken => {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [JWT, setJWT] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const router = useRouter();
  const query = useQuery();

  useEffect(() => {
    const login = async () => {
      setIsLoading(true);
      try {
        const { data: token } = await authAPI.post('/login', { code: query.code });
        setJWT(token.accessToken);
        sessionStorage.setItem('jwt', token.accessToken);
        const { data: user } = await baseAPI.get('/users/current', getBearerHeader(token.accessToken));
        setUser(user);
        baseAPI.defaults.headers.Authorization = `Bearer ${token.accessToken}`;
      } catch (error) {
        setRequestError(error);
      }
      setIsLoading(false);
    };

    if (query && query.code) {
      login();
    }
  }, [query, router]);

  const loadUserFromSessionStorage = useCallback(async () => {
    const accessToken = sessionStorage.getItem('jwt');
    if (accessToken) {
      const payload = JwtDecode(accessToken);

      if (payload.exp > Math.floor(Date.now() / 1000)) {
        setIsLoading(true);
        setJWT(accessToken);
        sessionStorage.removeItem('jwt');
        baseAPI.defaults.headers.Authorization = `Bearer ${accessToken}`;
        try {
          const { data: user } = await baseAPI.get('/users/current', getBearerHeader(accessToken));
          if (user) {
            setUser(user);
          }
        } catch (error) {
          setRequestError(error);
        }
      } else {
        baseAPI.defaults.headers.Authorization = undefined;
        sessionStorage.removeItem('jwt');
      }
    } else {
      baseAPI.defaults.headers.Authorization = undefined;
      sessionStorage.removeItem('jwt');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUserFromSessionStorage();
  }, [loadUserFromSessionStorage]);

  const logout = () => {
    sessionStorage.removeItem('jwt');
    setUser();
    baseAPI.defaults.headers.Authorization = undefined;
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, isLoading, requestError, logout, JWT }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
