import { Col } from 'react-bootstrap'
import './footer.css'
import { Link } from 'react-router-dom'

// icons
import { MdBlock } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";


export default function Footer(){
    return(
        <div className='bg-black text-light'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fill-opacity="1" d="M0,256L15,234.7C30,213,60,171,90,154.7C120,139,150,149,180,170.7C210,192,240,224,270,245.3C300,267,330,277,360,282.7C390,288,420,288,450,250.7C480,213,510,139,540,122.7C570,107,600,149,630,144C660,139,690,85,720,101.3C750,117,780,203,810,218.7C840,235,870,181,900,160C930,139,960,149,990,144C1020,139,1050,117,1080,144C1110,171,1140,245,1170,250.7C1200,256,1230,192,1260,160C1290,128,1320,128,1350,154.7C1380,181,1410,235,1425,261.3L1440,288L1440,0L1425,0C1410,0,1380,0,1350,0C1320,0,1290,0,1260,0C1230,0,1200,0,1170,0C1140,0,1110,0,1080,0C1050,0,1020,0,990,0C960,0,930,0,900,0C870,0,840,0,810,0C780,0,750,0,720,0C690,0,660,0,630,0C600,0,570,0,540,0C510,0,480,0,450,0C420,0,390,0,360,0C330,0,300,0,270,0C240,0,210,0,180,0C150,0,120,0,90,0C60,0,30,0,15,0L0,0Z"></path></svg>
            <div className='d-md-flex footer-section'>
                <Col sm={6} >
                    <Link to='/BuyToken'>Buy Token <TiTickOutline color='green'/></Link>
                    <Link to='/GetAirdrop'>Airdrop <TiTickOutline color='green'/></Link>
                    <Link>NFT <MdBlock color='red' /></Link>
                    <Link>Staking <MdBlock color='red' /></Link>
                    <Link to='/WhitePaper'>WhitePaper <TiTickOutline color='green'/></Link>
                </Col>
                <Col sm={6}>
                    <a href='https://www.instagram.com/gtafantoken' target='_blank'>Instagram <FaInstagramSquare color='white'/></a>
                    <a href='https://x.com/gtafantoken?s=11&t=SS4jYcb9dp3id4mPXklOeg' target='_blank'>X 'Twitter' <FaSquareXTwitter color='white'/></a>
                    <a href='https://mail.google.com' target='_blank'>Email:gtafantoken@gmail.com <IoMdMail color='white'/></a>
                </Col>
            </div>
            <p className='p-footer-section'>this page build in 2024 </p>
        </div>

    )
}