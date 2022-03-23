import { ADD, DELE, EDIT, PUT, PUSH_TOP } from "../Constant";

export const putJob = payload => ({
    type: PUT,
    payload
})

export const addJob = payload => ({
    type: ADD,
    payload
})

export const deleJob = payload => ({
    type: DELE,
    payload
})

export const pushTopJob = payload => ({
    type: PUSH_TOP,
    payload
})

export const editJob = payload => ({
    type: EDIT,
    payload
})
