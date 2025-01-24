const initialState = {
    cartItems: [],
    total: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.id === item.id);

            if (existItem) {
                const updatedCartItems = state.cartItems.map(x => x.id === existItem.id ? item : x);
                const updatedTotal = updatedCartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
                return {
                    ...state,
                    cartItems: updatedCartItems,
                    total: updatedTotal,
                };
            } else {
                const updatedCartItems = [...state.cartItems, item];
                const updatedTotal = updatedCartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
                return {
                    ...state,
                    cartItems: updatedCartItems,
                    total: updatedTotal,
                };
            }
        case 'REMOVE_FROM_CART':
            const filteredCartItems = state.cartItems.filter(x => x.id !== action.payload);
            const updatedTotalRemove = filteredCartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
            return {
                ...state,
                cartItems: filteredCartItems,
                total: updatedTotalRemove,
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: [],
                total: 0,
            };
        default:
            return state;
    }
};

export default cartReducer;
