import { apiSlice } from './apiSlice';

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => '/cart',
            providesTags: ['Cart'],
            keepUnusedDataFor: 5
        }),
        addToCart: builder.mutation({
            query: (item) => ({
                url: '/cart/add',
                method: 'POST',
                body: item
            }),
            invalidatesTags: ['Cart']
        }),
        updateCartItem: builder.mutation({
            query: (data) => ({
                url: '/cart/update',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Cart']
        }),
        removeCartItem: builder.mutation({
            query: (itemId) => ({
                url: `/cart/remove/${itemId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        }),
        clearCart: builder.mutation({
            query: () => ({
                url: '/cart/clear',
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        })
    })
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation,
    useClearCartMutation
} = cartApiSlice;
