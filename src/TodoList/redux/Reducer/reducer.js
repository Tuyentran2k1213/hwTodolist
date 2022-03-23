import { ADD, DELE, EDIT, PUT, PUSH_TOP } from "../Constant";

const initialState = {
    job: '',
    jobs: [],
}

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    let newState;
    switch (type) {
        case PUT:
            newState = {...state,
            job: payload};
            break;
        case ADD:
            newState = {
                ...state,
                jobs: [...state.jobs, payload]
            }
            break;
        case DELE:
            let newJob = state.jobs;
            newJob.splice(payload, 1);
            newState = {
                ...state,
                jobs: [...newJob]
            }
            break;
        case PUSH_TOP:
            let oldJob = state.jobs;
            let job = oldJob.splice(payload, 1);
            oldJob.unshift(job);
            newState = {
                ...state,
                jobs: [...oldJob]
            }
            break;
        case EDIT:
            let aJob = [...state.jobs];
            aJob[payload.arr] = payload.value;
            newState = {...state, jobs: aJob}
            break;
        default:
            newState = {...state}
    }
    return newState;
}

export default reducer;