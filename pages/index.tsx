import fetch from "node-fetch";
import Layout from "../components/layout";
import SwiperComp from "../components/swiper";
import Articles from "../components/articles";

type Props = {
  posts: any;
};

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
    
      { /* -------------------------------------------------------
        ▽ スワイパースライダー ▽
      ---------------------------------------------------------- */ }
      <SwiperComp />

      <h2 className="sttl">new Post</h2>
      
      { /* -------------------------------------------------------
        ▽ 記事一覧  ▽
      ---------------------------------------------------------- */ }
      <Articles posts={posts} slug={`post`} />
    
    </Layout>
  );
};

export const getStaticProps = async () => {
  
  /* -------------------------------------------------------
    ▽ 記事情報の取得  ▽
  ---------------------------------------------------------- */
  const res = await fetch(
    `${process.env.WP_HOST}/wp-json/wp/v2/posts?_embed&per_page=6`
  );
  const json = await res.json();
  return {
    props: {
      posts: json,
    },
  };
  
};

export default Home;
