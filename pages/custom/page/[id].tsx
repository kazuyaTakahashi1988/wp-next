import fetch from "node-fetch";
import Layout from "../../../components/layout";
import Articles from "../../../components/articles";

type Props = {
  posts: any;
  total: number;
  id: number;
};

export const customPage = ({ posts, total, id }: Props) => {
  
  return (
    <Layout
      /* -------------------------------------------------------
        ▽ 固有 meta ▽
      ---------------------------------------------------------- */
      pageTtl={`customPage-${id} | customPost`}
      pageDes={`customPage-${id}のディスクリプション`}
      pageUrl={`custom/page/${id}`}
      // pageKey=""
      // pageThum=""
      pageType="custom"
    >

      <h2 className="sttl">new customPost - {id}</h2>
      
      { /* -------------------------------------------------------
        ▽ 記事一覧  ▽
      ---------------------------------------------------------- */ }
      <Articles posts={posts} slug={`custom`} total={total} currentNum={id} />

    </Layout>
  );
};

export const getStaticPaths = async () => {
  
  /* -------------------------------------------------------
    ▽ SSG用のパス指定  ▽
  ---------------------------------------------------------- */
  const now = new Date();
  const clear = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  const res = await fetch(
    `${process.env.WP_HOST}/wp-json/wp/v2/custom?_embed&per_page=6&cache=${clear}`
  );
  const total = res.headers.get("x-wp-totalpages");
  const idNums = Array.from(new Array(Number(total))).map((v, i) => i + 1);
  const paths = idNums.map((idNum) => `/custom/page/${idNum}`);
  return { paths, fallback: false };

};

export const getStaticProps = async (context: { params: any }) => {
  
  /* -------------------------------------------------------
    ▽ 記事情報の取得  ▽
  ---------------------------------------------------------- */
  const now = new Date();
  const clear = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  const { id } = context.params;
  const res = await fetch(
    `${process.env.WP_HOST}/wp-json/wp/v2/custom?_embed&per_page=6&page=${id}&cache=${clear}`
  );
  const total = res.headers.get("x-wp-totalpages");
  const json = await res.json();
  return {
    props: {
      posts: json,
      total: total,
      id: id,
    },
  };
  
};

export default customPage;
