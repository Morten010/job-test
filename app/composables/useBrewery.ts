import type { BreweryType } from "@/types/breweryTypes";

const useFetchBreweries = async <T>(path: string = "/", queryParams?: any) => {
  return await useFetch<T>(path, {
    baseURL: "https://api.openbrewerydb.org",
    query: queryParams,
  });
};

export type BreweryOptions = {
  by_city?: string;
  by_country?: string;
  by_dist?: string;
  by_ids?: string;
  by_name?: string;
  by_state?: string;
  by_postal?: string;
  by_type?: string;
  page?: string;
  per_page?: string;
  sort?: string;
};

export const useBrewery = () => {
  return {
    getBreweries: ({
      queryParams = {},
    }: {
      queryParams?: any;
    } = {}) =>
      useFetchBreweries<BreweryType[]>("/v1/breweries", queryParams || {}),
    getSingleBrewery: (id: string) =>
      useFetchBreweries<BreweryType>(`/v1/breweries/${id}`),
    getRandomBrewery: (size: string = "1") =>
      useFetchBreweries<BreweryType[]>("/v1/breweries/random", { size }),
    searchBreweries: (
      query: string,
      per_page: string = "15",
      page: string = "1",
    ) =>
      useFetchBreweries<BreweryType[]>("/v1/breweries/search", {
        query,
        per_page,
        page,
      }),
    getBreweriesMeta: ({
      queryParams = {},
    }: {
      queryParams?: any;
    } = {}) =>
      useFetchBreweries<{ total: string; page: string; per_page: string }>(
        "/v1/breweries/meta",
        queryParams,
      ),
  };
};
