import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './style.css';
import carousel from './carousel-images/carousel.webp';
import carousel2 from './carousel-images/carousel2.jpg';

function TopCarousel() {
    return (
<div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" interval="2000">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src={carousel} alt="First slide" />
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={carousel2} alt="Second slide" />
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={carousel} alt="Third slide" />
    </div>
  </div>
</div>
);
}
export default TopCarousel;
