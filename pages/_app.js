/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../utils/Layout";
import { store } from "../store";
import { Provider } from "react-redux";
import { loadContract } from "../service/loadContract";

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => {
      setTimeout(() => {
        // url === router.asPath &&
        setLoading(false);
      }, 1000);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    loading && (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    )
  );
}

function MyApp({ Component, pageProps }) {
  const [contractInfo, setContractInfo] = useState({});
  const router = useRouter();
  let isLayout =
    router.pathname != "/" &&
    router.pathname != "/auth/register" &&
    router.pathname != "/auth/login";

  useEffect(() => {
    loadService();
  });

  const loadService = async () => {
    const res = await loadContract();
    setContractInfo(res);
  };

  return (
    <>
      <Provider store={store}>
        <Loading />
        <div>
          {isLayout ? (
            <Layout contractInfo={contractInfo}>
              <Component contractInfo={contractInfo} {...pageProps} />
            </Layout>
          ) : (
            <Component contractInfo={contractInfo} {...pageProps} />
          )}
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
