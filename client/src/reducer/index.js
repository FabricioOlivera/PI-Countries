import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  SORT_BY_NAME,
  SORT_BY_POPULATION,
  GET_COUNTRY_BY_NAME,
  GET_COUNTRY_BY_ID,
  FILTER_BY_SEASON,
} from "../actions/types";

const initialstate = {
  countries: [],
  allCountries: [],
  detail: [],
};
function reducer(state = initialstate, { type, payload }) {
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload,
        allCountries: payload,
      };
    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        countries: payload,
      };
    case GET_COUNTRY_BY_ID:
      return {
        ...state,
        detail: payload,
      };

    case FILTER_BY_CONTINENT:
      const countriesAll = state.allCountries;
      if (payload === "default") {
        return { ...state };
      }

      const countryFiltered =
        payload === "All"
          ? countriesAll
          : countriesAll.filter((c) => c.continent === payload);

      return {
        ...state,
        countries: countryFiltered,
      };

    case FILTER_BY_SEASON:
      const filterCountriesWhitActivities = state.countries.filter(
        (c) => c.activities.length > 0
      );

      return {
        ...state,
        countries: filterCountriesWhitActivities,
      };

    case SORT_BY_NAME:
      if (payload === "default") {
        return { ...state };
      }
      const countrySort =
        payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        countries: countrySort,
      };

    case SORT_BY_POPULATION:
      if (payload === "default") {
        return { ...state };
      }

      let order =
        payload === "men"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: order,
      };

    default:
      return state;
  }
}

export default reducer;
