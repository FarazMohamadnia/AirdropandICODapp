// css
import './nav.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

//img
import vImg from '../../asset/icons8-rockstar-color/icons8-rockstar-games-50.png'

// react-icons
import { GiTwoCoins } from "react-icons/gi";
import { IoIosGift } from "react-icons/io";
import { AiFillPicture } from "react-icons/ai";
import { BsBank2 } from "react-icons/bs";
import { RiNewspaperFill ,RiMenuSearchFill } from "react-icons/ri";

// sweet alert
import Swal from 'sweetalert2'


function Navigation() {

    function warning(){
        Swal.fire({
            title: "COMING SOON .....",
            text: "This section is under development.",
            icon: "warning"
        });
    }

    return (
      <>
         <Navbar expand={'xxl'} className="Nav-background border-bottom">
              <Navbar.Brand href="/" className=''><img src={vImg}></img></Navbar.Brand>
              <p className='m-auto title-p'>GTA FAN TOKEN</p>
              <Navbar.Toggle style={{backgroundColor : 'rgba(255, 255, 255, 0.8)'}} />
              <Navbar.Offcanvas className='bg-black text-white'>
                <Offcanvas.Header closeButton className='bg-light text-dark'>
                  <Offcanvas.Title>
                    Menu <RiMenuSearchFill />
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/BuyToken" >Buy Token <GiTwoCoins/></Nav.Link>
                    <Nav.Link href="/GetAirdrop" >Airdrop <IoIosGift /></Nav.Link>
                    <Nav.Link href="" onClick={warning}>NFT <AiFillPicture /></Nav.Link>
                    <Nav.Link href="" onClick={warning}>Staking <BsBank2 /></Nav.Link>
                    <Nav.Link href="/WhitePaper" >WhitePaper <RiNewspaperFill /></Nav.Link>    
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
          </Navbar>
      </>
    );
}

export default Navigation;