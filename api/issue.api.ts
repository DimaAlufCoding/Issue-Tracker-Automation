import axios from "axios";
import { CreateIssue } from "../types/issue";

const BASE_URL = process.env.BASE_URL;
const URL = `${BASE_URL}/api/issues`;

export const getIssues = () => {
  console.log("###URL### " + URL);
  return axios.get(URL);
};

export const getIssue = (id: number) => {
  return axios.get(`${URL}/${id}`);
};

export const createIssue = (body: CreateIssue) => {
  return axios.post(URL, body);
};

export const deleteIssue = (id: number) => {
  return axios.delete(`${URL}/${id}`);
};

export const updateIssues = (id: number, body: CreateIssue) => {
  return axios.put(`${URL}/${id}`, body);
};
