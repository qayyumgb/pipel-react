import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


import { BASE_API_URL } from "./config";



// Tags identifiers for API Endpoints
export const TAGS = [""]


// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,

    prepareHeaders: (headers) => {
        // Headers Configuration Goes Here

        return headers;
    },
});



export const BASE_API = createApi({

    reducerPath: "api",
    
    baseQuery: baseQuery,

    endpoints: () => ({}),

    tagTypes: TAGS,
});
