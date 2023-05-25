import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from 'firebase.init';

const useGetUserId = (email) => {
    const [userDbId, setUserDbId] = useState('');
    const [userSites, setUserSites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        if (email) {
            setLoading(true);
            const q = query(collection(firestore, 'users'), where('email', '==', email));

            getDocs(q).then((data) => {
                if (!data.empty) {
                    const user = data.docs[0];

                    setUserDbId(user.id);
                    const sites = user.data()?.sites || [];
                    setUserSites(sites);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            });
        }
    }, [email, refetch]);

    return { userDbId, userSites, refetch: setRefetch, loading };
};

export default useGetUserId;
