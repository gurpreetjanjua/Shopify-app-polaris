import { api } from "../../services/api";

export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILURE = "ORDER_FAILURE";

//Action Creator
export const getData = params => {
    let options = { url: "/api/orders" };
    options.types = [TOKEN_SUCCESS, TOKEN_FAILURE];
    return api.get(options, params);
};

