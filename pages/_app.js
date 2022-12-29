/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../utils/Layout";
import { store } from "../store";
import { Provider } from "react-redux";
import { loadContract } from "../service/loadContract";
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
    <Provider store={store}>
      <div>
        {isLayout ? (
          <Layout>
            <Component contractInfo={contractInfo} {...pageProps} />
          </Layout>
        ) : (
          <Component contractInfo={contractInfo} {...pageProps} />
        )}
      </div>
    </Provider>
  );
}

export default MyApp;
