// import auth from '@/firebase/auth';
// import useGetShops from '@/hooks/useGetShops';
// import useGetUserId from '@/hooks/useGetUserId';
import { auth } from 'firebase.init';
import useGetShops from 'hooks/useGetShops';
import useGetUserId from 'hooks/useGetUserId';
import React, { createContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Context = createContext('');

function ContextProvider({ children }) {
    const [user] = useAuthState(auth);

    const [selectedProducts, setSelectedProducts] = useState([]);

    const [searchValue, setSearchValue] = useState('');

    const { userDbId, loading: userLoading, refetch: userRefetch, userSites } = useGetUserId(user?.email);

    const { shops, loading: shopLoading, refetch: shopRefetch } = useGetShops(userDbId);

    return (
        <Context.Provider
            value={{
                userDbId,
                userLoading,
                userRefetch,
                userSites,
                shops,
                shopLoading,
                shopRefetch,
                selectedProducts,
                setSelectedProducts,
                searchValue,
                setSearchValue
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;
