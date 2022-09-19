import { getPageItem } from "../redux/reducers/studentSlice";
import axiosClient from "./axiosClient";

export const getPageStudent = async (id, dispatch) => {
  const page = await axiosClient.get(`/page/${id}`);
  dispatch(getPageItem(page));
};

export const createStudent = async (data, dispatch, id) => {
  const student = await axiosClient.post("/student", data);

  const page = await axiosClient.get(`/page/${id}`);

  dispatch(getPageItem(page));
};

// export const deleteStudent = async (data, id, dispatch) => {
//   await data.forEach(async (id) => {
//     await axiosClient.delete(`/student/${id}`);
//   });
// };

export const updatePageStudent = async (id, dispatch) => {
  const studentList = await axiosClient.get("/student");

  const page = await axiosClient.get(`/page/${id}`);
  const updatePage = await axiosClient.patch(`/page/${id}`, {
    ...page,
    rows: studentList,
  });

  dispatch(getPageItem(updatePage));
};

export const getInfo = async (param) => {
  const info = await axiosClient.get(`${param}`);
  return info;
};
