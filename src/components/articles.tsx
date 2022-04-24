import Link from "next/link";
import { Props } from "../lib/props";
import React, { useEffect, useState } from "react";

export const Articles = ({ posts, slug, total, currentNum }: Props) => {
  
  /* -------------------------------------------------------
    ▽ ページャー用DOM  ▽
  ---------------------------------------------------------- */
  const [pagerItem, setPagerItem] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const pushItem: JSX.Element[] = [];
    for (let i = 1; i < total + 1; i++) {
      pushItem.push(
        <li key={`${i}`} className={i == currentNum ? "current" : ""}>
          <Link href={`/${slug}/page/${i}`}>
            <a>{i}</a>
          </Link>
        </li>
      );
    }
    setPagerItem(pushItem);
  }, [total, currentNum]);

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
      {pagerItem.length >= 1 && <ul className="peger">{pagerItem}</ul>}
    </>
  );
};

export default Articles;
