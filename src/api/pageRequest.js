import { getPage } from "../redux/reducers/pageSlice";
import axiosClient from "./axiosClient";

export const getLayoutPage = async (dispatch) => {
  const page = await axiosClient.get(`/page`);
  return dispatch(getPage(page));
};

export const createPage = async (data, dispatch) => {
  const page = await axiosClient.post("/page", data);
  await getLayoutPage(dispatch);
};

export const updateColumnPage = async ({ idPage, data }, dispatch) => {
  const page = await axiosClient.patch(`/page/${idPage}`, data);
};

export const updateTablePage = async (idPage, data) => {
  const page = await axiosClient.patch(`/page/${idPage}`, data);
  return page;
};
