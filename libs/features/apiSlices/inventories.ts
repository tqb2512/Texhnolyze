import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { inventory } from "@prisma/client";

export const inventoriesAPI = createApi({
    reducerPath: "inventories",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getInventory: builder.query<inventory, string>({
            query: (id) => `inventories?inventory_id=${id}`,
        }),
        getInventories: builder.query<inventory[], void>({
            query: () => "inventories",
        }),
    }),
});

export const { useGetInventoryQuery, useGetInventoriesQuery } = inventoriesAPI;
