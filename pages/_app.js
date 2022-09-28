import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../utils/Layout";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // console.log(router.pathname);
  return (
    <div>
      {router.pathname != "/" && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
