import fetch from "node-fetch";
import { Props } from "../lib/props";
import Layout from "../components/layout";
import SwiperComp from "../components/swiper";
import Articles from "../components/articles";

export const Home = ({ posts }: Props) => {
  
  return (
    <Layout
      /* -------------------------------------------------------
        ▽ 固有 meta ▽
      ---------------------------------------------------------- */
      pageTtl="Homeのタイトル"
      // pageDes=""
      // pageUrl=""
      // pageKey=""
      // pageThum=""
      pageType="home"
    >

      {/* -------------------------------------------------------
        ▽ スワイパースライダー ▽
      ---------------------------------------------------------- */}
      <SwiperComp />

      {/* -------------------------------------------------------
        ▽ 記事一覧  ▽
      ---------------------------------------------------------- */}
      <h2 className="sttl">new Post</h2>
      <Articles
        posts={posts}
        slug={`post`}
        total={0}
        currentNum={0}
        postDetail={undefined}
        id={""}
      />

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
    `${process.env.WP_HOST}/wp-json/wp/v2/posts?_embed&per_page=6&cache=${clear}`
  );
  const json = await res.json();
  return {
    props: {
      posts: json,
    },
  };

};

export default Home;
