import Link from "next/link";
import React, { useState } from "react";

type Props = {
  posts?: any;
  slug?: string;
  total?: number;
  currentNum?: number;
};

export const Articles = ({ posts, slug, total, currentNum }: Props) => {
  return (
    <>
      {/* -------------------------------------------------------
        ▽ 記事リスト  ▽
      ---------------------------------------------------------- */}
      <ul className="postList">
        {posts.map((post: any, index: number) => (
          <li key={`${index}`}>
            <Link href={`/${slug}/detail/${post.id}`}>
              <a>
                <div className="thum">
                  <img src="/frame.png" alt="フレーム" />
                  <img
                    src={
                      post._embedded["wp:featuredmedia"]
                        ? post._embedded["wp:featuredmedia"][0].source_url
                        : "/dummy.png"
                    }
                    alt={post.title.rendered}
                    className="thum-img"
                  />
                </div>
                {post.date.slice(0, 10)}
                <br />
                <strong>{post.title.rendered}</strong>
                {post.content.rendered
                  .replace(/(<([^>]+)>)/gi, "")
                  .slice(0, 50)}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      {/* -------------------------------------------------------
        ▽ ページャー  ▽
      ---------------------------------------------------------- */}
      <ul className="peger">
        {Array.from(new Array(Number(total)))
          .map((v, i) => i + 1)
          .map((Num: number, index: number) => (
            <li key={`${index}`} className={Num == currentNum ? "current" : ""}>
              <Link href={`/${slug}/page/${Num}`}>
                <a>{Num}</a>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Articles;
