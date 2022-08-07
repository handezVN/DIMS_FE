import ACTIONS from '.';
export function AddCart(payload) {
    return {
        type: ACTIONS.ADD_CART,
        payload,
    };
}
export function UpdateCart(payload) {
    return {
        type: ACTIONS.UPDATE_CART,
        payload,
    };
}
export function DeleteCart(payload) {
    return {
        type: ACTIONS.DELETE_CART,
        payload,
    };
}

export function IncreaseQuantity(payload) {
    return {
        type: ACTIONS.INCREASE_QUANTITY,
        payload,
    };
}
export function DecreaseQuantity(payload) {
    return {
        type: ACTIONS.DECREASE_QUANTITY,
        payload,
    };
}
export function AddCart_Fetch(payload) {
    return {
        type: ACTIONS.CART_FETCH,
        payload,
    };
}
