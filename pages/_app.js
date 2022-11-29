/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../utils/Layout";
import { store } from '../store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let isLayout = router.pathname != "/" && router.pathname != "/auth/register" && router.pathname != "/auth/login";
  return (
    <Provider store={store}>
      <div>
      {isLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </div>   
    </Provider>
  );
}

export default MyApp;