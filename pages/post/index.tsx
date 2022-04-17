import fetch from "node-fetch";
import Layout from "../../components/layout";
import Articles from "../../components/articles";

type Props = {
  posts: any;
  total: number;
};

export const Post = ({ posts, total }: Props) => {
  return (
    <Layout
      /* -------------------------------------------------------
        ▽ 固有 meta ▽
      ---------------------------------------------------------- */
      pageTtl="Page-1 | Post"
      pageDes="Page-1のディスクリプション"
      pageUrl="post"
      // pageKey=""
      // pageThum=""
      pageType="post"
    >
      
      <h2 className="sttl">new Post - 1</h2>

      { /* -------------------------------------------------------
        ▽ 記事一覧  ▽
      ---------------------------------------------------------- */ }
      <Articles posts={posts} slug={`post`} total={total} currentNum={1} />

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
  const total = res.headers.get("x-wp-totalpages");
  const json = await res.json();
  return {
    props: {
      posts: json,
      total: total,
    },
  };

};

export default Post;
