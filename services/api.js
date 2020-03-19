import axios from "axios";

const api = {
    get: options => async (dispatch, getState) => {
        const [success, failure] = options.types;
        const promise = (resolve, reject) => {
            return axios
                .get(options.url)
                .then(res => {
                    resolve(
                        dispatch({
                            type: success,
                            payload: res.data
                        })
                    );
                })
                .catch(err => {
                    reject(
                        dispatch({
                            type: failure,
                            payload: err
                        })
                    );
                });
        };

        return new Promise(promise);
    },
    post: (options, params = null) => async (dispatch, getState) => {
        const [success, failure] = options.types;
        const promise = (resolve, reject) => {
            axios
                .post(options.url, params)
                .then(res => {
                    resolve(
                        dispatch({
                            type: success,
                            payload: res.data
                        })
                    );
                })
                .catch(err => {
                    reject(
                        dispatch({
                            type: failure,
                            payload: err
                        })
                    );
                });
        };

        return new Promise(promise);
    },
    put: (options, params = null) => async (dispatch, getState) => {
        const [success, failure] = options.types;
        const promise = (resolve, reject) => {
            axios
                .put(options.url, params)
                .then(res => {
                    resolve(
                        dispatch({
                            type: success,
                            payload: res.data
                        })
                    );
                })
                .catch(err => {
                    reject(
                        dispatch({
                            type: failure,
                            payload: err
                        })
                    );
                });
        };

        return new Promise(promise);
    },
    delete: options => async (dispatch, getState) => {
        const [success, failure] = options.types;
        const promise = (resolve, reject) => {
            axios
                .delete(options.url)
                .then(res => {
                    resolve(
                        dispatch({
                            type: success,
                            payload: res.data
                        })
                    );
                })
                .catch(err => {
                    reject(
                        dispatch({
                            type: failure,
                            payload: err
                        })
                    );
                });
        };

        return new Promise(promise);
    }
};

export { api };