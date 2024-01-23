import {useQuery, UseQueryResult} from 'react-query';
import {GET_ALL_POSTS} from "../endpoints/endpoints";

export function useFetchData<T>(endpoint: string): UseQueryResult<T, Error> {
    const fetchData = async (): Promise<T> => {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json() as Promise<T>;
    };

    return useQuery<T, Error>([GET_ALL_POSTS], fetchData);
};

