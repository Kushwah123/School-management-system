import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentsList: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        stuffDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.statestatus = "added";
        },
        getSuccess: (state, action) => {
            state.studentsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        underStudentControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        }
    },
});

// export const studentFeesReducer = (state = {}, action) => {
//     switch (action.type) {
//       case STUDENT_FEES_REQUEST:
//         return { loading: true }
//       case STUDENT_FEES_SUCCESS:
//         return { loading: false, success: action.payload }
//       case STUDENT_FEES_FAIL:
//         return { loading: false, error: action.payload }
//       case STUDENT_FEES_RESET:
//         return {}
//       default:
//         return state
//     }
//   }

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    underStudentControl,
    stuffDone,
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;