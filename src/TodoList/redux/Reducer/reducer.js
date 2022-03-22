import { ADD, DELE, EDIT, PUT } from "../Constant";

const initialState = {
    job: '',
    jobs: [],
}

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case PUT:
            return {...state,
            job: payload};
        case ADD:
            return {
                ...state,
                jobs: [...state.jobs, payload]
            }
        default:
            return {...state}
    }
}

export default reducer;