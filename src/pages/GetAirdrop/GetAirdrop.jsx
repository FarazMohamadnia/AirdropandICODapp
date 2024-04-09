import './GetAirdrop.css'

import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { ethers } from 'ethers'
// react import
import { useEffect, useRef, useState } from 'react'
import Navigation from '../../components/navigation/nav'
import { Container } from 'react-bootstrap'
import Footer from '../../components/footer/footer'

// icons
import { TiTick } from "react-icons/ti";
import { BsXOctagonFill , BsFillSendFill} from "react-icons/bs";
import { PiSealWarningBold } from "react-icons/pi";
import { TbLivePhoto , TbLivePhotoOff} from "react-icons/tb";
import { FaPaperclip } from "react-icons/fa6";

//import sweet Alert
import Swal from 'sweetalert2'

// mui lib
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';

// address and abi
import { ABI, TokenAddress } from '../../token/config'


const GTAAddress = TokenAddress;
const GTAAbi = ABI

const etherValue = ethers.utils.parseEther('0.007');

export default function GetAirdrop() {
    const { isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()
    const [ airdropAddress , setairdropAddress]=useState('')
    const [ sendAddressText , setsendAddressText]=useState(true)
    const [changeInputColor , setchangeInputColor]=useState('error')
    const [ BtnLoading , setBtnLoading] = useState(false)
    const [ checked , setchecked ] = useState(false)
    const [ activeAirdrop , setactiveAirdrop] = useState(true)
    const [ RunactiveAirdrop , setRunactiveAirdrop] = useState(true);
    const sendAddress = useRef(0);
    
    
    async function getBalance() {
      if (!isConnected) throw Error('User disconnected')
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      const signer = await ethersProvider.getSigner()
      // The Contract object
      const GTAContract = new ethers.Contract(GTAAddress, GTAAbi, signer)
      const USDTBalance = await GTAContract.totalSupply()
      console.log(ethers.utils.formatUnits(USDTBalance , 8))
    }

    const getActive =async()=>{
        if (!isConnected)console.log('User disconnected')
        const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
        const signer = await ethersProvider.getSigner()
        const GTAContract = new ethers.Contract(GTAAddress, GTAAbi, signer)
        const ActiveAirdrop = await GTAContract.activeView()
        ActiveAirdrop ? setactiveAirdrop(true) : setactiveAirdrop(false)
    } 


    async function airdrop() {
        if (!isConnected) throw Error('User disconnected')
        const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
        const signer = await ethersProvider.getSigner()
        const GTAContract = new ethers.Contract(GTAAddress, GTAAbi, signer)
        setBtnLoading(true)
        GTAContract.addAddress(airdropAddress , { value: etherValue })
        .then((tx) => {
            console.log(tx); 
            sendAddress.current.className = 'd-block'
            setsendAddressText(false)
            setBtnLoading(false)
        })
        .catch((error) => {
            console.error(error); 
            Swal.fire({
                title: "ERROR!",
                text: error.reason,
                icon: "error"
              });
            sendAddress.current.className = 'd-block'
            setsendAddressText(true)
            setBtnLoading(false)
        });
    }

    function getAddress(e){
      let value = e.target.value;
      setairdropAddress(value);
      let words = value.split('');
      let firstTwoWords = words[0] + "" + words[1];

      if (value.length >= 42 && firstTwoWords == '0x') {
          setchangeInputColor('success')

      } else {
          setchangeInputColor('error')
      }
    }

    useEffect(()=>{

    },[])

    if(isConnected && RunactiveAirdrop){
        getActive()
        setRunactiveAirdrop(false)
    }

  return( 
    <div>
        <Navigation />
        <div className='Airdrop-background'>
            <Container>
                <div className='connect-btn'>
                    <w3m-button style={{margin: 'auto'}}/>
                    <div>
                        {activeAirdrop ?
                        <div className='isActive-Airdrop'><TbLivePhoto color='green'/>active</div>
                        :
                        <div className='isNotActive-Airdrop'><TbLivePhotoOff color='red'/>Not active</div>}
                    </div>
                </div>
                <div className='form-style '>
                    <div className='form-body'> 
                        <h2 className='title-text'>GTA Token Airdrop</h2>
                        <form className='d-flex flex-column'>
                            <TextField 
                                onChange={getAddress} 
                                color={changeInputColor}
                                className='w-75 m-auto mt-2 send-input'  
                                id="outlined-basic" 
                                label="Address" 
                                variant="outlined"     
                            />
                            <LoadingButton
                              className='w-75 m-auto mt-2 fw-bold'
                              loadingPosition="center"
                              variant="outlined"
                              onClick={airdrop}
                              loading={BtnLoading}
                              disabled={!checked}
                            >
                              Send <BsFillSendFill size={'1.2rem'}/>
                            </LoadingButton>
                            <span className='p-0 m-0 d-none' ref={sendAddress}>
                                {sendAddressText ? <p className='warning-span'>Sending failed <BsXOctagonFill color='red'/></p> : <p className='warning-span'>Submitted successfully<TiTick color='green'/></p>}
                            </span>
                            <p className='Des-Rules'>
                                Please <span className='text-danger' >read</span> and <span className='text-danger'>confirm</span> the rules to participate in the airdrop
                            </p>
                            <p className='acc-Rules'>
                                I accept all terms and conditions
                                <Checkbox className='m-0 p-0' onChange={val => setchecked(val.target.checked)} />
                            </p>
                        </form>
                    </div>
                    <div className='form-Rules'>
                        <div className='scrolling-Rules'>
                            <span>Scrolling</span>
                            <lord-icon
                                src="https://cdn.lordicon.com/dbxmvtbf.json"
                                trigger="loop"
                                stroke="bold"
                                state="loop-cycle"
                                colors="primary:#911710,secondary:#1b1091"
                                style={{width:'50px',height:'50px'}}>
                            </lord-icon>
                        </div>
                        <p className='fw-bold '><FaPaperclip />Rules</p>
                        <p><PiSealWarningBold color='red'/>-Connect your wallet.</p>
                        <p><PiSealWarningBold color='red'/>-Accept the rules by checking the box.</p>
                        <p><PiSealWarningBold color='red'/>-You cannot send an address twice.</p>
                        <p><PiSealWarningBold color='red'/>-The sender's wallet address must match the receiver's address.</p>
                        <p><PiSealWarningBold color='red'/>-Token contract address:<span className='bg-danger'>{TokenAddress}</span></p>
                        <p><PiSealWarningBold color='red'/>-You must have gas for token transfer.</p>
                        <p><PiSealWarningBold color='red'/>-If your address structure is correct, the input will turn green.</p>
                        <p><PiSealWarningBold color='red'/>-Make sure you're on the BNB network and send your BNB address.</p>
                        <p><PiSealWarningBold color='red'/>-Be sure to follow us on social media.</p>
                        <p><PiSealWarningBold color='red'/>-After completing the operation,  token will be sent to you immediately.</p>
                        <p><PiSealWarningBold color='red'/>-You can see the activation and deactivation of airdrop at the top of the page.</p>
                    </div>
                </div>

            </Container>
        </div>
        <Footer />
    </div>
  )
}