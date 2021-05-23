const initialState = {
    text: ""
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH_QUERY":
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default searchReducer