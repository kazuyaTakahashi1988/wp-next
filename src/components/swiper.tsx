import { Swiper, SwiperSlide } from "swiper/react"; 
import SwiperCore, { Pagination, Navigation } from "swiper"; 

SwiperCore.use([Pagination, Navigation]);

/* -------------------------------------------------------
  ▽ 使用imageの配列 ▽
---------------------------------------------------------- */
const images = ["/logo-react.png", "/logo-wp.png", "/favicon.ico", "/ogp.jpg", ];

const SwiperComp = () => {
  return (
    <Swiper
      /* -------------------------------------------------------
        ▽ スワイパーオプション ▽
      ---------------------------------------------------------- */
      slidesPerView={1} // 表示スライド数
      navigation // スライドナビ
      loop={true}
      loopAdditionalSlides={1}
    >

      {images.map((src: string, index: number) => {
        /* -------------------------------------------------------
          ▽ DOM ▽
        ---------------------------------------------------------- */
        return (
          <SwiperSlide key={`${index}`}>
            <img src="/frame-sw.png" alt="frame" />
            <img src={src} alt="test_image" className="sw-img" />
          </SwiperSlide>
        );
      })}

    </Swiper>
  );
};

export default SwiperComp;
