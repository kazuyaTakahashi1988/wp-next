import fetch from "node-fetch";
import { Props } from "../../lib/props";
import Layout from "../../components/layout";
import Articles from "../../components/articles";

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

      {/* -------------------------------------------------------
        ▽ 記事一覧  ▽
      ---------------------------------------------------------- */}
      <h2 className="sttl">new Post - 1</h2>
      <Articles
        posts={posts}
        slug={`post`}
        total={total}
        currentNum={1}
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
