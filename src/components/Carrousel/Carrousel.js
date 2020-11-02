import React, { Component } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import styled from "styled-components";

const DivCarrousel = styled.section `
    width: 60%;
    // background: black;
    margin: 80px auto;
    height: auto;
    
    
    @media(max-width: 768px){
        width: 80%;
    }
`;

 const photos = [
     {
         name: 'photo 1',
         url: 'https://www.purina.es/gato/purina-one/sites/g/files/mcldtz1856/files/2018-06/Mi_gato_no_come%20%282%29.jpg'
     },
     {
         name: 'photo 2',
         url: 'https://www.lavanguardia.com/r/GODO/LV/p6/WebSite/2019/04/02/Recortada/img_mrius_20190402-141602_imagenes_lv_terceros_gato_nombre2-328-kLmH-U461425413181OZB-992x558@LaVanguardia-Web.jpg'
     },
     {
         name: 'photo 3',
         url: 'https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/facebook_share/public/purina-como-escoger-un-gato.png?itok=fWyig0_1'
     }
 ]


export default class Carrousel extends Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        arrows: true,
        width: '20px',
      };
      
      return (
        <DivCarrousel>
          <h2> Ultimas desapariciones</h2>
          <Slider {...settings}>

          {photos.map((photo) => {
                    return(
                        <div>
                            <img width='100%' src={photo.url}/>
                        </div>
                    )
               })}
          </Slider>
        </DivCarrousel>
      );
    }
  }
