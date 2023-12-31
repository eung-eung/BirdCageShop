import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './DetailSwiper.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Products_Cage } from '../../../data/CagesNewest';
import { useParams } from 'react-router-dom';

export default function DetailSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { id } = useParams();

  const product = Products_Cage.find((product) => product._id === parseInt(id, 10));

  const [img, setImg] = useState('');

  // useEffect(() => {
  //   if (product) {
  //     const regx = /:\[\d{3},\d{3}]/g;
  //     const regxQuotes = /(\"{|\\|}")/g;
  //     const regxCurlyBraces = /(\{)/g;
  //     const regxCurlyBraces2 = /(\})/g;

  //     const formattedImages = product.images
  //       .replace(regx, '')
  //       .replace(regxQuotes, '[')
  //       .replace(regxCurlyBraces2, ']')
  //       .replace(regxCurlyBraces, '[');

  //     setImg(JSON.parse(formattedImages));
  //   }
  // }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }


  return (
    <div>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {/* {img.map((image, index) => ( */}
          <SwiperSlide >
            <img
              src={product.imagePath}
              alt={product.name}
              style={{ maxWidth: '300px', maxHeight: '500px', objectFit: 'contain' }} 
            />
          </SwiperSlide>
        {/* ))} */}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper3"
      >
        {/* {img.map((image, index) => ( */}
          <SwiperSlide>
            <img
              src={product.imagePath}
              alt={product.name}
              style={{ maxWidth: '100px', maxHeight: '500px' }}
            />
          </SwiperSlide>
        {/* ))} */}
      </Swiper>
    </div>
  );
}