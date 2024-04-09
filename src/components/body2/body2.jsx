import { Col} from 'react-bootstrap'
import './body2.css'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';

// import mui chart 
import  {PieChart}  from '@mui/x-charts/PieChart';

//icons 
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";



export default function Body2(){
  
  const data = [
    { id: 0, value: 100000000, label: 'AIRDROP'},
    { id: 1, value: 400000000, label: 'TEAM'},
    { id: 2, value: 150000000, label: 'BURN'},
    { id: 3, value: 150000000, label: 'ICO'},
    { id: 4, value: 200000000, label: 'STAKING'},
  ];

    return(
        <div className='d-md-flex flex-wrap'>    
          
                    <Col md={6} lg={4} className='roadmap'>
                        <h3>ROADMAP</h3>
                        <Swiper
                          effect={'flip'}
                          grabCursor={true}
                          pagination={true}
                          navigation={true}
                          modules={[EffectFlip, Pagination, Navigation]}
                          className="Swiper3"
                        >
                          <SwiperSlide className='swiper-slide3'>
                            <h4>2024</h4>
                            <ul>
                                <li>Web application development</li>
                                <li>Listing the token on CoinMarketCap and CoinGecko</li>
                                <li>ICO token launch</li>
                                <li>Listing on decentralized exchanges</li>
                                <li>Community formation</li>
                            </ul>
                          </SwiperSlide>
                          <SwiperSlide className='swiper-slide3'>
                          <h4>2025</h4>
                            <ul>
                                <li>Launching the staking section</li>
                                <li>Launching the NFT section</li>
                                <li>Extensive simultaneous advertising with game release</li>
                                <li>Funding from major companies</li>
                                <li>Establishing a wide network among GTA gamers</li>
                                <li>Smart contract agreements on other networks</li>
                            </ul>
                          </SwiperSlide>
                          <SwiperSlide className='swiper-slide3'>
                            <h4>2026</h4>
                            <ul>
                                <li>Buying and selling gamers' NFTs on the site</li>
                                <li>Listing tokens on exchanges such as KuCoin, CoinEx, etc.</li>
                                <li>Developing an app for better communication among GTA token holders</li>
                                <li>Extensive token burning</li>
                                <li>Further decentralizing the project</li>
                            </ul>
                          </SwiperSlide>
                        </Swiper>
                    </Col>
                    <Col md={6} lg={4} className='tokenomy-section'>
                    <h2 className='title-text'>TOKENOMY</h2>
                    <PieChart
                      series={[
                        {
                          data,
                          highlightScope: { faded: 'global', highlighted: 'item' },
                          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                      ]}
                      height={200}
                    />
                    </Col>
                    <Col lg={4} className='community-section p-4'>
                      <h3 className='title-text '>JOIN COMMUNITY</h3>
                      <div>
                        <a className='link-style-a' href='https://www.instagram.com/gtafantoken' target='_blank'><div className='d-block text-center my-4'><FaInstagram size={'4rem'} className='icons-hover'/><span className='d-block'>instagram</span></div></a>
                        <a className='link-style-a' href='https://x.com/gtafantoken?s=11&t=SS4jYcb9dp3id4mPXklOeg' target='_blank'><div className='d-block text-center my-4'><FaSquareXTwitter size={'4rem'} className='icons-hover' /><span className='d-block'>X 'twitter'</span></div></a>
                        <a className='link-style-a' href='https://mail.google.com' target='_blank'><div className='d-block text-center my-4'><SiGmail size={'4rem'} className='icons-hover'/><span className='d-block text-size-gmail'>gtafantoken@gmail.com</span></div></a>
                      </div>
                    </Col>  
        </div>
    )
}