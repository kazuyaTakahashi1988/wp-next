import Head from "next/head";
import { GA_TRACKING_ID } from "../lib/gtag";
import Header from "../components/header";
import Footer from "../components/footer";

type Props = {
  children?: React.ReactNode;
  SITE_HOST?: string;
  SITE_NAME?: string;
  /* ▽ OGP meta ▽ */
  pageTtl?: string;
  pageDes?: string;
  pageKey?: string;
  pageUrl?: string;
  pageThum?: string;
  pageType?: string;
  DEFAULT_DES?: string;
  DEFAULT_KEY?: string;
  DEFAULT_THUM?: string;
};

export const Layout = ({
  children,
  SITE_HOST = process.env.SITE_HOST,
  SITE_NAME = process.env.SITE_NAME,
  /* ▽ OGP meta ▽ */
  pageTtl,
  pageDes,
  pageKey,
  pageUrl,
  pageThum,
  pageType,
  DEFAULT_DES = process.env.DEFAULT_DES,
  DEFAULT_KEY = process.env.DEFAULT_KEY,
  DEFAULT_THUM = SITE_HOST + `${process.env.DEFAULT_THUM}`,
}: Props) => {
  return (
    <>
      <Head>
        {/* -------------------------------------------------------
          ▽  Google Analytics (GA_TRACKING_IDが設定されてない場合はなし) ▽
        ---------------------------------------------------------- */}
        {GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
        `,
              }}
            />
          </>
        )}
        {/* -------------------------------------------------------
          ▽ OGP meta ▽
        ---------------------------------------------------------- */}
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTtl ? `${pageTtl} | ${SITE_NAME}` : SITE_NAME}</title>
        <meta name="description" content={pageDes ? pageDes : DEFAULT_DES} />
        <meta name="keywords" content={pageKey ? pageKey : DEFAULT_KEY} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta
          property="og:url"
          content={pageUrl ? `${SITE_HOST}/${pageUrl}` : SITE_HOST}
        />
        <meta
          property="og:title"
          content={pageTtl ? `${pageTtl} | ${SITE_NAME}` : SITE_NAME}
        />
        <meta
          property="og:description"
          content={pageDes ? pageDes : DEFAULT_DES}
        />
        <meta
          property="og:image"
          content={pageThum ? pageThum : DEFAULT_THUM}
        />
        <meta property="og:locale" content="ja_JP" />
        <meta
          property="og:type"
          content={pageType == `home` ? `website` : `article`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* -------------------------------------------------------
        ▽ コンテンツ ▽
      ---------------------------------------------------------- */}
      <div className="contswrap" id="contswrap">
        {/* ▽ 共通ヘッダー ▽ */}
        <Header pageType={pageType} />

        {/* ▽ 固有コンテンツ ▽ */}
        <main>{children}</main>

        {/* ▽ 共通フッター ▽ */}
        <Footer copyright="&copy; Next.js Demo" />
      </div>
    </>
  );
};

export default Layout;
