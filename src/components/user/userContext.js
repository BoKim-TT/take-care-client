import { useState, createContext } from 'react';


export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // current user state
  const [user, setUser] = useState(
    window.sessionStorage.getItem('take_care_user')
  ? JSON.parse(window.sessionStorage.getItem('take_care_user'))
  : {token: null});
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


