import { apiSlice } from './apiSlice';
import { PRODUCTS_URL } from '../../utils/constants';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, pageNumber, category, minPrice, maxPrice, sort }) => ({
                url: '/products',
                params: {
                    keyword,
                    pageNumber,
                    category,
                    minPrice,
                    maxPrice,
                    sort
                }
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `/products/${productId}`
            }),
            keepUnusedDataFor: 5
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `/products/${data.productId}/reviews`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: '/products',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/products/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product']
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateReviewMutation,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation
} = productsApiSlice;
