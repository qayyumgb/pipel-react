import { BASE_API } from "../../../service";
import { API_METHODS } from "../../../service/config";

export const HomeAPI = BASE_API.injectEndpoints({
    endpoints: (builder) => ({
        homeCarouselData: builder.query({
            query: () => ({
                url: `/some-end-point`,
                method: API_METHODS.GET,
            }),

            // provide and invalidate tag should be same incase data or api dependent on each other
            providesTags: ["unique_tag_for_this_endpoint"],
        }),



        uploadSomeData: builder.mutation({
            query: ({ payload }: any) => ({
                url: `/some-end-point`,
                method: API_METHODS.POST,
                body: payload
            }),

            invalidatesTags: ["unique_tag_for_this_endpoint"],
        }),


        updateInnerActive: builder.mutation({
            query: ({ payload }: any) => ({
                url: `/some-end-point`,
                method: API_METHODS.POST,
                body: payload
            }),

            invalidatesTags: ["unique_tag_for_this_endpoint"],
        }),

        updateEditData: builder.mutation({
            query: ({ payload }: any) => ({
                url: `/some-end-point`,
                method: API_METHODS.POST,
                body: payload
            }),

            invalidatesTags: ["unique_tag_for_this_endpoint"],
        }),

    }),
});

export const { useHomeCarouselDataQuery, useUploadSomeDataMutation, useUpdateInnerActiveMutation, useUpdateEditDataMutation } = HomeAPI;
