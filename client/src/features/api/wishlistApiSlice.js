import { apiSlice } from './apiSlice';

export const wishlistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: () => '/wishlist',
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        addToWishlist: builder.mutation({
            query: (data) => ({
                url: '/wishlist/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        removeFromWishlist: builder.mutation({
            query: (productId) => ({
                url: `/wishlist/remove/${productId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        })
    })
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation
} = wishlistApiSlice;
