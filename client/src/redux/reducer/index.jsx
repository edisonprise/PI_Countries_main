import { GET_ORDER } from "../actions/actions_types";

import {
  GET_COUNTRIES,
  GET_DETAIL,
  GET_ACTIVITIES,
  SET_LOADING,
  RESET_DETAIL,
  ADD_NEW_ACTIVITY,
  GET_ALL_REGIONS,
  SEARCH_BY_NAME,
  GET_FILTERS_CONTINENT,
  GET_FILTERS_ACTIVITY,
  SET_ALL_COUNTRIES,
} from "../actions/actions_types";
const initialState = {
  currentCountries: [],
  allCountries: [],
  filterByActivity: [],
  filterByContinent: [],
  allActivities: [],
  allRegions: [],
  detailed: {},
  loading: true,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        currentCountries: action.payload,
      };
    case SEARCH_BY_NAME:
      if (!action.payload.length) {
        return {
          ...state,
          currentCountries: "WE CAN'T FOUND RESULTS, CHECK AGAIN",
        };
      } else {
        return {
          ...state,
          currentCountries: action.payload,
        };
      }
    case SET_ALL_COUNTRIES:
      return {
        ...state,
        currentCountries: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detailed: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case RESET_DETAIL:
      return {
        ...state,
        detailed: {},
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        allActivities: action.payload,
      };
    case GET_ALL_REGIONS:
      return {
        ...state,
        allRegions: action.payload,
      };
    case ADD_NEW_ACTIVITY:
      return {
        ...state,
        allActivities: [...state.allActivities, action.payload],
      };
    case GET_FILTERS_CONTINENT:
      state.currentCountries = state.allCountries;

      return {
        ...state,

        currentCountries: state.currentCountries.filter(
          (e) => e.subregion.region.name === action.payload
        ),
        filterByContinent: state.currentCountries.filter(
          (c) => c.subregion.region.name === action.payload
        ),
      };
    case GET_FILTERS_ACTIVITY:
      state.currentCountries = state.allCountries;
      if (state.filterByContinent.length) {
        return {
          ...state,
          currentCountries: state.filterByContinent.filter((e) =>
            e.activities.find((ele) => ele.name === action.payload)
          ),
        };
      }
      return {
        ...state,
        currentCountries: state.currentCountries.filter((e) =>
          e.activities.find((ele) => ele.name === action.payload)
        ),
      };

    case GET_ORDER:
      let sorted = [...state.currentCountries];
      let options = {
        "a-z": function (a, b) {
          return new Intl.Collator().compare(a.name, b.name);
        }, //equivale a LocalCompare pero para grandes matrices
        "z-a": function (a, b) {
          return new Intl.Collator().compare(b.name, a.name);
        },
        "population-lower": function (a, b) {
          return a.population - b.population;
        },
        "population-higer": function (a, b) {
          return b.population - a.population;
        },
      };
      sorted.sort((a, b) => options[action.payload](a, b));
      return {
        ...state,
        currentCountries: sorted,
      };

    //     case GET_ORDER:
    //         let sorted = [...state.countries];
    //   let options = {
    //     "a-z": function (a, b) {
    //       return new Intl.Collator().compare(a.name, b.name);
    //     }, //equivale a LocalCompare pero para grandes matrices
    //     "z-a": function (a, b) {
    //       return new Intl.Collator().compare(b.name, a.name);
    //     },
    //     "population-lower": function (a, b) {
    //       return a.population - b.population;
    //     },
    //     "population-higer": function (a, b) {
    //       return b.population - a.population;
    //     },
    //   };
    //   sorted.sort((a, b) => options[action.payload](a, b));

    //   return {
    //     ...state,
    //     allCountries: sorted,
    //   };

    default:
      return state;
  }
}
