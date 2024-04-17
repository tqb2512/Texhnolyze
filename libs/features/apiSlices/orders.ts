import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { order } from "@prisma/client";

export const ordersApi = createApi({
    reducerPath: "orders",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getOrders: builder.query<order[], void>({
            query: () => "orders",
        }),
        getOrder: builder.query<order, string>({
            query: (id) => `orders/?order_id=${id}`,
            transformResponse: (response: order[]) => response[0],
        }),
        getOrdersByUser: builder.query<order[], string>({
            query: (id) => `orders/?user_id=${id}`,
        })
    }),
});

export const { useGetOrdersQuery, useGetOrderQuery, useGetOrdersByUserQuery } = ordersApi;