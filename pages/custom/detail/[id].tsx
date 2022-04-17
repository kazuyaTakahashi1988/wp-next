import fetch from "node-fetch";
import Layout from "../../../components/layout";

type Props = {
  postDetail: any;
  id: number;
};

export const customPage = ({ postDetail, id }: Props) => {
  return (
    <Layout
      /* -------------------------------------------------------
        ▽ 固有 meta ▽
      ---------------------------------------------------------- */
      pageTtl={`${postDetail.title.rendered} | customPost`}
      pageDes={postDetail.content.rendered
        .replace(/(<([^>]+)>)/gi, "")
        .slice(0, 130)}
      pageUrl={`custom/detail/${id}`}
      pageThum={
        postDetail._embedded["wp:featuredmedia"]
          ? postDetail._embedded["wp:featuredmedia"][0].source_url
          : "/dummy.png"
      }
      // pageKey=""
      pageType="custom"
    >
      
      { /* -------------------------------------------------------
        ▽ 記事詳細  ▽
      ---------------------------------------------------------- */ }
      <h2 className="sttl">{postDetail.title.rendered}</h2>
      <div className="post_contents-area">
        <div className="data">{postDetail.date.slice(0, 10)}</div>

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
                dangerouslySetInnerHTML={{ __html: postDetail.acf.sub_contents }}
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
  const res = await fetch(
    `${process.env.WP_HOST}/wp-json/wp/v2/custom?per_page=6`
  );
  const total = res.headers.get("x-wp-totalpages");
  let jsonAll: any[] = [];
  for (let index = 1; index < Number(total) + 1; index++) {
    const res = await fetch(
      `${process.env.WP_HOST}/wp-json/wp/v2/custom?per_page=6&page=${index}`
    );
    const json: any = await res.json();
    await json.map((jsonPush: any) => {
      jsonAll.push(jsonPush);
    });
  }
  const paths = jsonAll.map((jsonChild) => `/custom/detail/${jsonChild.id}`);
  return { paths, fallback: false };

};

export const getStaticProps = async (context: { params: any }) => {
  
  /* -------------------------------------------------------
    ▽ 記事情報の取得  ▽
  ---------------------------------------------------------- */
  const { id } = context.params;
  const res = await fetch(
    `${process.env.WP_HOST}/wp-json/wp/v2/custom/${id}?_embed`
  );
  const json = await res.json();
  return {
    props: {
      postDetail: json,
      id: id,
    },
  };
  
};

export default customPage;
