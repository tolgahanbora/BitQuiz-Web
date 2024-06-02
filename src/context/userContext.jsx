/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../utils/supabase'; // Supabase bağlantısını içeri aktarın

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [user2, setUser2] = useState(null);

  const broadcastUser = async () => {
    try {
      const channels = supabase.channel('custom-all-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'profiles' },
          (payload) => {
          
            setUser(payload.new.data);
          }
        )
        .subscribe();
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("buansd", data)
      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }
      
      let { data: profiles } = await supabase
        .from('profiles')
        .select('data')
        .eq("id", data.user.id);
      
      setUser(profiles[0].data);

      // localStorage kontrolü
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId !== data.user.id.toString()) {
        localStorage.setItem('userId', data.user.id.toString());
      }
    };

    fetchUser();
    broadcastUser()
}, []);





  return (
    <UserContext.Provider  value={{ user, user2 }}>
      {children}
    </UserContext.Provider>
  );
};
