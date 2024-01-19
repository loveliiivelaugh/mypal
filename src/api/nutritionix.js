import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const {
  REACT_APP_NUTRITIONIX_KEY: key,
  REACT_APP_NUTRITIONIX_HOST: host,
  REACT_APP_NUTRITIONIX_APP_ID: appId,
} = process.env;

const headers = {
  'x-app-id': appId,
  'x-app-key': key,
}

export const getNutritionixItem = async (id) => {
  const url = `https://${host}/v2/search/item/?nix_item_id=${id}`;
  const options = { headers };
  const response = await fetch(url, options);
  const data = await response.json();
  return data?.foods?.[0];
};

// Define a service using a base URL and expected endpoints
export const nutritionixApi = createApi({
  reducerPath: 'nutritionixApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${host}/v2/`,
    prepareHeaders(headers) {
      headers.set('x-app-id', appId)
      headers.set('x-app-key', key)
      return headers
    },
  }),
  tagTypes: ['Nutritionix'],
  endpoints: (builder) => ({
    getInstant: builder.query({
      query: (q) => `search/instant/?query=${q}`,
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => {
        // dbApi.add('exercises_library', Array.isArray(response) ? response : [response])
        return response;
      },
    }),
    getItem: builder.query({
      query: (id) => `search/item/?nix_item_id=${id}`
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetInstantQuery, useGetItemQuery } = nutritionixApi;

