import { get } from "./request";

export const getUsers = (page, limit) =>
    get(`/users?page=${page}&limit=${limit}`);
