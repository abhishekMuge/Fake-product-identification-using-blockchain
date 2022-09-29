import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../utils/Layout";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let isLayout = router.pathname != "/" && router.pathname != "/auth";
  return (
    <div>
      {isLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}

export default MyApp;
