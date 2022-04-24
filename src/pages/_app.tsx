import "../styles/style.scss";
import type { AppProps } from "next/app";
import { GA_TRACKING_ID, pageview } from '../lib/gtag';
import React, { useEffect } from "react";

function MyApp({ Component, pageProps, router }: AppProps) {
  
  /* -------------------------------------------------------
    ▽ ページ遷移毎 に発火するJS処理 ▽
  ---------------------------------------------------------- */
  useEffect(() => {

    // フェードインのクラス付加
    setTimeout(() => {
      document.getElementById("contswrap")?.classList.add("active");
    }, 100);
    return () => {
      // フェードインのクラス削除
      document.getElementById("contswrap")?.classList.remove("active");
    };

  }, [router.pathname, router.query]);

  /* -------------------------------------------------------
    ▽ Google Analytics の処理 ▽
  ---------------------------------------------------------- */
  useEffect(() => {
    
    // GA_TRACKING_ID が設定されてる場合の処理
    if (!GA_TRACKING_ID) return;
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
    
  }, [router.events]);

  /* -------------------------------------------------------
    ▽ DOMレンダー ▽
  ---------------------------------------------------------- */
  return <Component {...pageProps} />;

}

export default MyApp;
