import { Col, Container, Row } from 'react-bootstrap'
import './header.css'
// icon
import { MdDescription } from "react-icons/md";
//import img icon
import img2 from '../../asset/category/nft-high-resolution-logo.png'
import img3 from '../../asset/category/staking-high-resolution-logo.png'
import img4 from '../../asset/category/token-high-resolution-logo.png'
import img5 from '../../asset/category/airdrop-high-resolution-logo.png'
// swiper lib
// import Swiper styles
import 'swiper/css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';



// import required modules
import { EffectCube, Pagination } from 'swiper/modules';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';



export default function Header(){
    return(
        <div className='d-lg-flex'>
                
                    <Col lg={6}  className='container-child1'>
                        <div>
                            <div className='star-1'></div>
                            <div className='star-1'></div>
                            <div className='star-1'></div>
                            <div className='star-1'></div>
                            <div className='star-1'></div>
                        </div>

                        <Link to='/BuyToken'><Button variant="contained" className='d-block m-auto my-2 button-width'>Buy TOKEN</Button></Link>
                        <Link to='/GetAirdrop'><Button variant="contained" className='d-block m-auto my-2 button-width'>Get Airdrop</Button></Link>

                    </Col>
                    <Col lg={6}  className='container-child2'>
                        <div className='text-center'>
                            <h1 className='title-text'>Description<MdDescription /></h1>
                            <p>
                            The GTA game will be a revolutionary force in the gaming and cryptocurrency industries, with fans of all ages and tastes from every corner of the world. The GTA fan  token technology is already gearing up for this revolution, and fans can participate by purchasing our token in this revolution. Our team has created a strong tokenomics with anti-inflation features and many capabilities, expecting significant price growth until the game's release and beyond. We will be the largest fan base team for the GTA game, generating significant profits for the company and fans alike.
                            </p>

                            <Swiper
                              effect={'cube'}
                              grabCursor={true}
                              cubeEffect={{
                              shadow: true,
                              slideShadows: true,
                              shadowOffset: 20,
                              shadowScale: 0.94,
                              }}
                              pagination={true}
                              modules={[EffectCube, Pagination]}
                              className="mySwiper1"
                            >
                              <SwiperSlide>
                                <img src={img5} className='border'/>
                              </SwiperSlide>
                              <SwiperSlide>
                                <img src={img4} className='border'/>
                              </SwiperSlide>
                              <SwiperSlide>
                                <img src={img3} className='border'/>
                              </SwiperSlide>
                              <SwiperSlide>
                                <img src={img2} className='border'/>
                              </SwiperSlide>
                            </Swiper>
                        </div>
    
                    </Col>
        </div>
    )
}