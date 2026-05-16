import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Order', 'Cart']
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `/orders/${id}`
            }),
            providesTags: ['Order'],
            keepUnusedDataFor: 5
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: '/orders/myorders'
            }),
            providesTags: ['Order'],
            keepUnusedDataFor: 5
        }),
        createPaymentIntent: builder.mutation({
            query: (data) => ({
                url: '/payments/stripe/create-intent',
                method: 'POST',
                body: data
            })
        }),
        getPaypalClientId: builder.query({
            query: () => ({
                url: '/payments/config/paypal'
            }),
            keepUnusedDataFor: 5
        }),
        getOrders: builder.query({
            query: () => ({
                url: '/orders'
            }),
            providesTags: ['Order'],
            keepUnusedDataFor: 5
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `/orders/${orderId}/deliver`,
                method: 'PUT'
            }),
            invalidatesTags: ['Order']
        }),
        updateOrderStatus: builder.mutation({
            query: ({ orderId, status }) => ({
                url: `/orders/${orderId}/status`,
                method: 'PUT',
                body: { status }
            }),
            invalidatesTags: ['Order']
        }),
        updatePaymentStatus: builder.mutation({
            query: ({ orderId, status }) => ({
                url: `/orders/${orderId}/payment`,
                method: 'PUT',
                body: { status }
            }),
            invalidatesTags: ['Order']
        })
    })
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    useGetMyOrdersQuery,
    useCreatePaymentIntentMutation,
    useGetPaypalClientIdQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation,
    useUpdateOrderStatusMutation,
    useUpdatePaymentStatusMutation
} = ordersApiSlice;
