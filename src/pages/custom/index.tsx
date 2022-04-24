import fetch from "node-fetch";
import { Props } from "../../lib/props";
import Layout from "../../components/layout";
import Articles from "../../components/articles";

export const customPost = ({ posts, total }: Props) => {

  return (
    <Layout
      /* -------------------------------------------------------
        ▽ 固有 meta ▽
      ---------------------------------------------------------- */
      pageTtl="customPage-1 | customPost"
      pageDes="customPage-1のディスクリプション"
      pageUrl="custom"
      // pageKey=""
      // pageThum=""
      pageType="custom"
    >

      { /* -------------------------------------------------------
        ▽ 記事一覧  ▽
      ---------------------------------------------------------- */ }
      <h2 className="sttl">new customPost - 1</h2>
      <Articles posts={posts} slug={`custom`} total={total} currentNum={1} />

    </Layout>
  );
};

export const getStaticProps = async () => {
  
  /* -------------------------------------------------------
    ▽ 記事情報の取得  ▽
  ---------------------------------------------------------- */
  const now = new Date();
  const clear = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  const res = await fetch(
    `${process.env.WP_HOST}/wp-json/wp/v2/custom?_embed&per_page=6&cache=${clear}`
  );
  const total = res.headers.get("x-wp-totalpages");
  const json = await res.json();
  return {
    props: {
      posts: json,
      total: total,
    },
  };
  
};

export default customPost;
