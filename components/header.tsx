import Link from "next/link";

type Props = {
  pageType?: string;
};

export const Header = ({ pageType }: Props) => {
  return (
    <header>
      <div className="head_bar clear">

        { /* -------------------------------------------------------
           ▽ ロゴ  ▽
        ---------------------------------------------------------- */ }
        <div className="logo_area">
          <a
            href={process.env.WP_HOST}
            target="_blank"
            rel="noreferrer"
          >
            <img src="/logo-wp.png" alt="WPロゴ" />
          </a>
        </div>

        { /* -------------------------------------------------------
           ▽ グローバルナビ ▽
        ---------------------------------------------------------- */ }
        <div className="right_clmn">
          <nav>
            <ul>
              <li className={pageType == `home` ? `current` : ``}>
                <Link href="/">Home</Link>
              </li>
              <li className={pageType == `post` ? `current` : ``}>
                <Link href="/post">Post</Link>
              </li>
              <li className={pageType == `custom` ? `current` : ``}>
                <Link href="/custom">customPost</Link>
              </li>
              <li className={pageType == `contact` ? `current` : ``}>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
