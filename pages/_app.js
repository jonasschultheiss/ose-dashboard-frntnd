import 'tailwindcss/tailwind.css';
// import {useState, useEffect, createContext} from 'react';

// const UserContext = createContext()

function MyApp({ Component, pageProps }) {
  // const [user, setUser] = useState();
  // const [token, setToken] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  // const savedToken = sessionStorage.getItem('token');

  // useEffect(() => {
  //   const  loadUserFromSessionStorage =async ()=>{}
  // })

  return <Component {...pageProps} />;
}

export default MyApp;
