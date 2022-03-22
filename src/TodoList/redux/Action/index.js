import { ADD, DELE, EDIT, PUT } from "../Constant";

export const putJob = payload => ({
    type: PUT,
    payload
})

export const addJob = payload => ({
    type: ADD,
    payload
})