import { Col } from 'react-bootstrap'
import './body1.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';

// import video
import GTAvideo from '../../asset/video/GTAtrailer.mp4'


export default function Body1(){
    return(
        <div className='body1-section d-flex flex-column-reverse flex-lg-row'>
                {/* <Row className='body1-section d-flex flex-column-reverse flex-lg-row'> */}
                    <Col lg={6} className='card-section'>
                        <Swiper
                          effect={'cards'}
                          grabCursor={true}
                          modules={[EffectCards]}
                          className="swiper-card-slide1"
                        >
                            <SwiperSlide className='swiper-slide2 overflow-auto'>
                                <h3>TOKEN</h3>
                                <p className='p-2'>
                                    Our team plans to create 1 billion tokens and burn a significant portion of them in the future, offering a large portion at a very low price among fans to benefit our community primarily. Our token's smart contract is professionally developed by a three-person team with high security. The GTA Fan Token has numerous capabilities, some of which are active now, while others will be activated in the future.
                                </p>
                            </SwiperSlide>
                            
                            <SwiperSlide className='swiper-slide2 overflow-auto'>
                                <h3>NFT</h3>
                                <p className='p-2'>
                                    The NFT section is one of the most important and sensitive parts of the GTA Fan Token project. Some initial NFTs will be offered for sale, and by purchasing them, you will be partnering with the project in the NFT section's revenue. Holders of these NFTs will receive profits from the sale of NFTs in GTA Fan Token. When our game is released, we will also create an NFT market in our web application so that token holders can list their NFTs for sale on our site.
                                </p>
                            </SwiperSlide>
                            <SwiperSlide className='swiper-slide2 overflow-auto'>
                                <h3>STAKING</h3>
                                <p className='p-2'>
                                    Our team has added staking functionality to the site to control supply and demand and regulate tokenomics, which will be launched in the future. Staking the token will be limited, and a limited number of tokens will be distributed among holders who stake their tokens, with diminishing returns over time to prevent heavy token dumping. The primary profits of the GTA Fan Token are in the staking section and other sections for those who act sooner.
                                </p>
                            </SwiperSlide>
                            <SwiperSlide className='swiper-slide2 overflow-auto'>
                                <h3>AIRDROP</h3>
                                <p className='p-2'>
                                    To ensure fair distribution of our token among fans, we have allocated some tokens for an airdrop to fans who join our project early. To prevent excessive withdrawals with various addresses, we have imposed a gas fee, which prevents the project from becoming centralized and prevents excessive withdrawal by a malicious user. You can take action to receive the airdrop right now on the web application and instantly withdraw the token. The opportunity to receive the airdrop will be limited and will be available in small quantities, so act quickly to withdraw your token while the airdrop is active.
                                </p>
                            </SwiperSlide>
                        </Swiper>
                    </Col>
                    <Col lg={6} className='video-section'> 
                        <div>
                            <h3 className='text-warning w-100  title-text'>GTA FAN TOKEN TRAILER</h3>
                        <video controls poster='GTA Trailer'  className='video-controler' src={GTAvideo}/>
                        </div>
                    </Col>
                {/* </Row> */}
        </div>
    )
}