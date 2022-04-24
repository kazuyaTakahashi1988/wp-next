import Link from "next/link";
import fetch from "node-fetch";
import { Props } from "../../../lib/props";
import Layout from "../../../components/layout";

export const Detail = ({ postDetail, id }: Props) => {
  return (
    <Layout
      /* -------------------------------------------------------
        ▽ 固有 meta ▽
      ---------------------------------------------------------- */
      pageTtl={`${postDetail.title.rendered} | Post`}
      pageDes={postDetail.content.rendered
        .replace(/(<([^>]+)>)/gi, "")
        .slice(0, 130)}
      pageUrl={`post/detail/${id}`}
      pageThum={
        postDetail._embedded["wp:featuredmedia"] &&
        postDetail._embedded["wp:featuredmedia"][0].source_url
      }
      // pageKey=""
      pageType="post"
    >
      {/* -------------------------------------------------------
        ▽ 記事詳細 ▽
      ---------------------------------------------------------- */}
      <h2 className="sttl">{postDetail.title.rendered}</h2>
      <div className="post_contents-area">
        <div className="data">{postDetail.date.slice(0, 10)}</div>
        <div className="cate">
          <span>category:</span>
          {postDetail._embedded["wp:term"][0].map(
            (category: any, index: number) => (
              <a key={`${index}`}>
                <Link href={`/post/category/${category.slug}`}>
                  {category.name}
                </Link>
              </a>
            )
          )}
        </div>

        <div className="wclmn">
          <div className="thum">
            <span>サムネイル</span>
            <img src="/frame.png" alt="フレーム" />
            <img
              src={
                postDetail._embedded["wp:featuredmedia"]
                  ? postDetail._embedded["wp:featuredmedia"][0].source_url
                  : "/dummy.png"
              }
              alt={postDetail.title.rendered}
              className="thum-img"
            />
          </div>
          <div
            className="content editor-style"
            dangerouslySetInnerHTML={{ __html: postDetail.content.rendered }}
          ></div>
        </div>

        <div className="custam-fields-area">
          <h3 className="ttl">CustomField</h3>
          <div className="sub-title">
            <span>sub-title：</span>
            {postDetail.acf.sub_title}
          </div>
          <div className="wclmn">
            <div className="sub-thum">
              <span>sub-サムネイル</span>

              <img src="/frame.png" alt="フレーム" />
              <img
                src={
                  postDetail.acf.sub_thum
                    ? postDetail.acf.sub_thum
                    : "/dummy.png"
                }
                alt="sub-サムネイル"
                className="thum-img"
              />
            </div>
            <div className="sub-conts">
              <div
                className="editor-style"
                dangerouslySetInnerHTML={{
                  __html: postDetail.acf.sub_contents,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
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
    `${process.env.WP_HOST}/wp-json/wp/v2/posts?per_page=6&cache=${clear}`
  );
  const total = res.headers.get("x-wp-totalpages");
  let jsonAll: any[] = [];
  for (let index = 1; index < Number(total) + 1; index++) {
    const res = await fetch(
      `${process.env.WP_HOST}/wp-json/wp/v2/posts?per_page=6&page=${index}&cache=${clear}`
    );
    const json: any = await res.json();
    await json.map((jsonPush: any) => {
      jsonAll.push(jsonPush);
    });
  }
  const paths = jsonAll.map((jsonChild) => `/post/detail/${jsonChild.id}`);
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
    `${process.env.WP_HOST}/wp-json/wp/v2/posts/${id}?_embed&cache=${clear}`
  );
  const json = await res.json();
  return {
    props: {
      postDetail: json,
      id: id,
    },
  };

};

export default Detail;
