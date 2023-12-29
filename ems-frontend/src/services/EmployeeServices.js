import axios from "axios";

const url =import.meta.env.VITE_REST_API_BASE_URL

export const listEmployees = () => {
  return axios.get(url);
};

export const createEmployee = (employee) =>
  axios.post(url, employee);

export const getEmployee = (employeeId) =>
  axios.get(url + "/" + employeeId);

export const updateEmployee = (employeeId, employee) =>
axios.put(url + "/" + employeeId, employee);

export const deleteEmployee = (employeeId) =>
  axios.delete(url + "/" + employeeId);
