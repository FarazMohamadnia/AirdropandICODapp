import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { ethers } from 'ethers'


import { Container } from 'react-bootstrap'
import Footer from '../../components/footer/footer'
import Navigation from '../../components/navigation/nav'
import './BuyToken.css'
import { useEffect, useState } from 'react'
import { TbLivePhoto, TbLivePhotoOff } from 'react-icons/tb'
import { SiBinance } from "react-icons/si";
import { RiSwapFill } from "react-icons/ri";
import { BsCurrencyDollar, BsFillSendFill } from "react-icons/bs";
import { PiSealWarningBold } from "react-icons/pi";
import { FaPaperclip } from "react-icons/fa";


import { ABI, TokenAddress } from '../../token/config'
// import mui Lib
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import Swal from 'sweetalert2'





const GTAAddress = TokenAddress;
const GTAAbi = ABI;

export default function BuyToken() {
    const { isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()
    const [ activeToken , setactiveToken] = useState(true);
    const [ BitcoinPrice, setBitcoinPrice] = useState(0);
    const [ Price , setPrice] = useState(0);
    const [ TokenAmount , setTokenAmount] = useState(0);
    const [ inputValue , setinputValue]=useState(null);
    const [ RunactiveToken , setRunactiveToken] =useState(true)
    const [ sendEther , setsendEther]=useState(0);
    const [ BtnLoading , setBtnLoading]=useState(false)
    const [changeTrue , setchangeTrue]=useState(null);


    const fetchBitcoinPrice = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd');
            const data = response.data;
            const bnbPrice = data.binancecoin.usd;
            setBitcoinPrice(bnbPrice); 
        } catch (error) {
            console.error('Error fetching BNB price:', error);
        }
    }

    
    const activeOrnotactive = async()=>{
        const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
        const signer = await ethersProvider.getSigner()
        const GTAContract = new ethers.Contract(GTAAddress, GTAAbi, signer)
        let Active = await GTAContract.activeViewICO();
        if(Active){
            setactiveToken(true);
        }else{
            setactiveToken(false);
        }
    }

    async function setPriceValue(e){
        let value = e.target.value;
        setinputValue(value)
        const price = 0.00001
        if(BitcoinPrice == 0){
            fetchBitcoinPrice()
        }
        if(isConnected && value != 0 && value != ""){
            let EtherVal = ethers.utils.parseEther(value)
            const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
            const signer = await ethersProvider.getSigner()
            const GTAContract = new ethers.Contract(GTAAddress, GTAAbi, signer)

            let TokenAmount = await GTAContract.PriceToken(EtherVal);
            let PriceAmount =Math.round((TokenAmount / price) * BitcoinPrice) / 10**36;
            let tokenFine =ethers.utils.formatUnits(TokenAmount)/(10**8)
            setTokenAmount(tokenFine)
            setPrice(PriceAmount.toFixed(2))
            setsendEther(EtherVal)
        }
    }

    const getAddressBalance = async () => {
        const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
        const accounts = await ethersProvider.listAccounts();
        const addressOne =accounts[0]
        const balance = await ethersProvider.getBalance(addressOne);
        const safeBalance = ethers.utils.formatEther(balance);
        setinputValue(safeBalance);
    };
      

    async function sendBTNvalue(){
        if(sendEther == 0){
            return
        }else{
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
              });
              swalWithBootstrapButtons.fire({
                title: "Buy GTA?",
                text: `You want to trade ${inputValue}BNB for ${TokenAmount}GTA tokens`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, change it",
                cancelButtonText: "No, cancel",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    setBtnLoading(true)
                    payment()
                } else if (
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                    setBtnLoading(false)
                    swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "The transaction failed,Please try again.",
                    icon: "error"
                  });
                }
              });
            }
    }

    const payment = async ()=>{
        const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
        const signer = await ethersProvider.getSigner()
        const GTAContract = new ethers.Contract(GTAAddress, GTAAbi, signer)
        GTAContract.buyTokens({value : sendEther})
        .then((tx) => {
            console.log(tx);
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'The transaction successful',
                text: `Hash:${tx.hash}`,
                showConfirmButton: false,
                timer: 4500
              });
            setBtnLoading(false) 
        })
        .catch((error) => {
            setBtnLoading(false)
            Swal.fire({
                title: "Error",
                text: error.reason,
                icon: "error"
              });
            console.log(error); 
        });
    }


    useEffect(() => {
        fetchBitcoinPrice()
        
    },[])

    
    if(isConnected && RunactiveToken){
        activeOrnotactive()
        setRunactiveToken(false)
    }

    return (
        <div>
            <Navigation />
                <div className='BuyToken-background'>
                    <Container fluid='xxl'>
                        <div className='p-3'>
                            <w3m-button style={{margin: 'auto'}}/>
                            {activeToken ?
                            <div className='isActive-Airdrop'><TbLivePhoto color='green'/>active</div>
                            :
                            <div className='isNotActive-Airdrop'><TbLivePhotoOff color='red'/>Not active</div>}
                            <div className='Contract-Address'><span>BNB<SiBinance /></span> {TokenAddress} </div>
                        </div>

                        <div className='form-style mt-4'>
                            <h3 className='title-text'>
                                Buy GTA Token
                            </h3>
                            <Box
                              component="form"
                              sx={{
                                '& .MuiTextField-root': { m: 1, width:'80%',minWidth :'100px' , backgroundColor:'rgba(255, 255, 255, 0.55)'},
                              }}
                              className='position-relative'
                              autoComplete="on"
                            >
                            <span className='max-supply' onClick={getAddressBalance}>MAX</span>
                                <TextField
                                    id="filled-number"
                                    label="BNB"
                                    type="number"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    variant="filled"
                                    color='warning'
                                    disabled={BtnLoading}
                                    value={inputValue}
                                    onChange={setPriceValue}
                                    onClick={setPriceValue}
                                />
                            </Box>
                            <RiSwapFill size={'14%'} />
                            <div className='d-sm-flex view-price'>
                                <p>{TokenAmount}</p> <p>{Price}<BsCurrencyDollar /></p>
                            </div>
                            <LoadingButton
                              className='buy-BTN m-auto mt-3 fw-bold'
                              loadingPosition="center"
                              variant="outlined"
                              onClick={sendBTNvalue}
                              loading={BtnLoading}
                            >
                              Buy <BsFillSendFill size={'1.2rem'}/>
                            </LoadingButton>
                            <div className='BTN-Rules'>
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
                                <p className='fw-bold'><FaPaperclip />Rules</p>
                                <p><PiSealWarningBold color='red'/>-Connect your wallet.</p>
                                <p><PiSealWarningBold color='red'/>-Your network must be Binance Smart Chain (BSC).</p>
                                <p><PiSealWarningBold color='red'/>-Do not deposit more BNB than you have.</p>
                                <p><PiSealWarningBold color='red'/>-Leave some BNB as gas in your wallet.</p>
                                <p><PiSealWarningBold color='red'/>-Only enter the amount you want to buy in the input.</p>
                                <p><PiSealWarningBold color='red'/>-The purchase amount must not be less than 0.001.</p>
                                <p><PiSealWarningBold color='red'/>-The maximum purchase amount should not exceed 30 BNB.</p>
                                <p><PiSealWarningBold color='red'/>-You will see the token price and quantity received against the received amount.</p>
                                <p><PiSealWarningBold color='red'/>-The Max button gives you the total balance of your wallet.</p>
                                <p><PiSealWarningBold color='red'/>-You will see the transaction hash after completing the transaction.</p>
                                <p><PiSealWarningBold color='red'/>-The price of each token in the initial offering is 0.00001 BNB.</p>
                                <p><PiSealWarningBold color='red'/>-Follow our social media networks.</p>
                                <p><PiSealWarningBold color='red'/>-If the sale is active, you will see "active" above the page; if not active, you will see "not active."</p>
                                <p><PiSealWarningBold color='red'/>-Add the contract address to your wallet to see the tokens.</p>
                            </div>
                            
                        </div>

                    </Container>
                </div>
            <Footer />
        </div>
    )
}
