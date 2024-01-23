import {useMutation, useQueryClient, UseMutationResult, MutationFunction} from 'react-query';
import {ADD_POST, GET_ALL_POSTS} from "../endpoints/endpoints";
import {useSnackbar} from "../layout/snackbar/snackbar-context";

export interface CarouselAddItemData {
    id: string;
    title: string;
    description: string;
    order: number;
    active: boolean;
    image: string;
    action: string;
}

interface MutationResponse {

}


// Mutation function
const mutateData: MutationFunction<MutationResponse, CarouselAddItemData> = async (data: CarouselAddItemData) => {
    const response = await fetch(ADD_POST, {
        method: 'POST', // or 'PUT', 'DELETE', etc.
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json() as Promise<MutationResponse>;
};

// Custom hook
const usePostsMutation = (): UseMutationResult<MutationResponse, Error, CarouselAddItemData> => {
    const queryClient = useQueryClient();
    const {showMessage} = useSnackbar();


    return useMutation<MutationResponse, Error, CarouselAddItemData>(mutateData, {
        onSuccess: () => {
            showMessage("פוסט נוסף בהצלחה");
            // Invalidate and refetch queries here
            queryClient.invalidateQueries([GET_ALL_POSTS]);
            // Add more query keys as needed
        },
        onError: (error: Error) => {
            showMessage("שגיאה ביצירת פוסט");
            // Handle error here
            console.error('Mutation error:', error.message);
        },
    });
};

export default usePostsMutation;
