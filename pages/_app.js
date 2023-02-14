import "../styles/globals.css";
import "../styles/nprogress.css";
import "swiper/css";
import nProgress from "nprogress";
import Router from "next/router";
import { ContextProvider } from "../context/GlobalContext";
import Layout from "../components/Layout";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
