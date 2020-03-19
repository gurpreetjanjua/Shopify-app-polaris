import 'antd/dist/antd.css';

import App from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import withRedux from "next-redux-wrapper";
import { initStore } from '../redux/store';

export default withRedux(initStore)(
    class MyApp extends App {
        static async getInitialProps({ Component, ctx }) {
            const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

            //Anything returned here can be accessed by the client
            return { pageProps: pageProps };
        }

        render() {
            const { Component, pageProps, store } = this.props;

            return (
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            );
        }
    }
);


