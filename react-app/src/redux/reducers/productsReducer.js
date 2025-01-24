const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Define your action types and handlers here
        default:
            return state;
    }
};

export default productsReducer;
