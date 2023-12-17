import axios from "axios";
import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  GET_DETAIL,
  SET_LOADING,
  RESET_DETAIL,
  ADD_NEW_ACTIVITY,
  GET_ALL_REGIONS,
  GET_FILTERS,
  GET_FILTERS_CONTINENT,
  GET_FILTERS_ACTIVITY,
  GET_ORDER,
  SEARCH_BY_NAME,
  SET_ALL_COUNTRIES,
} from "./actions_types";

const server = "http://localhost:3001";

export const setAllCountries = (payload) => ({
  type: SET_ALL_COUNTRIES,
  payload,
});

export const getCountries = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/countries`);
    dispatch({
      type: GET_COUNTRIES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchCountry = (input) => async (dispatch) => {
  try {
    const searchName = await axios.get(`${server}/countries?name=${input}`);
    dispatch({
      type: SEARCH_BY_NAME,
      payload: searchName.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getByDetail = (id) => async (dispatch) => {
  try {
    const detail = await axios.get(`${server}/countries/${id}`);
    dispatch({
      type: GET_DETAIL,
      payload: detail.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setLoading = (Boolean) => ({
  type: SET_LOADING,
  payload: Boolean,
});

export const resetDetail = () => ({
  type: RESET_DETAIL,
});

export const newActivity = (input) => async () => {
  try {
    const response = await axios.post(`${server}/activities`, input);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllActivities = () => async (dispatch) => {
  try {
    const act = await axios.get(`${server}/activities`);
    dispatch({
      type: GET_ACTIVITIES,
      payload: act.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllRegions = () => async (dispatch) => {
  try {
    const reg = await axios.get(`${server}/regions`);
    dispatch({
      type: GET_ALL_REGIONS,
      payload: reg.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFilters = (payload) => (dispatch) => {
  try {
    const res = axios.get(`${server}/regions`);
    dispatch({ type: GET_FILTERS, payload, res });
  } catch (err) {
    console.error(err);
  }
};

export const getOrder = (option) => ({
  type: GET_ORDER,
  payload: option,
});

export const filterByContinent = (payload) => ({
  type: GET_FILTERS_CONTINENT,
  payload,
});

export const filterByActivity = (payload) => ({
  type: GET_FILTERS_ACTIVITY,
  payload,
});

