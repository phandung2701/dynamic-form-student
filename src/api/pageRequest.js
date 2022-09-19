import { getPage } from "../redux/reducers/pageSlice";
import { getPageItem } from "../redux/reducers/studentSlice";
import axiosClient from "./axiosClient";

// page

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

export const deletePage = async (idPage, dispatch) => {
  const page = await axiosClient.delete(`/page/${idPage}`);
  await getLayoutPage(dispatch);
};
export const getPageShema = async (id, dispatch) => {
  const page = await axiosClient.get(`/page/${id}`);
  dispatch(getPageItem(page));
};
export const updateTablePage = async (idPage, data) => {
  const page = await axiosClient.patch(`/page/${idPage}`, data);
  return page;
};

// item

export const createSchema = async (param, data) => {
  const create = await axiosClient.post(param, data);
  return create;
};
export const updateSchema = async (param, data) => {
  const update = await axiosClient.patch(param, data);
  return update;
};
export const DeleteSchema = async (param) => {
  const deleteItem = await axiosClient.delete(param);
  return deleteItem;
};
