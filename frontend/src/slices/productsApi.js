/**drugi način za fetchanje producta */

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://insylvis-webshop-1670bf22117e.herokuapp.com/"}),
    endpoints: (builder) =>({
        getAllProducts: builder.query({
            query: () => "products",
        }),
    }),
});

export const { useGetAllProductsQuery } = productsApi; 

/* tu nesto ne radi kako treba */