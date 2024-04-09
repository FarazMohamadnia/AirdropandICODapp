import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home/Home';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import GetAirdrop from './pages/GetAirdrop/GetAirdrop';
import BuyToken from './pages/BuyToken/BuyToken';

// favIcon lib
import { Helmet } from 'react-helmet';
import Favicon from './asset/favIcon/logo3.jpg'
import WhitePaper from './pages/WhitePaper/whiteP';


// 1. Get projectId
const projectId = 'bf4d49496731b4c9c3d6024397e8fa3b'

// 2. Set chains
const mainnet = {
  chainId: 56,
  name: 'Binance Smart Chain',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc.drpc.org'
}

// set testnet
const testnet = {
  chainId: 97,
  name: 'BNB Testnet',
  currency: 'BNB',
  explorerUrl: 'https://testnet.bscscan.com',
  rpcUrl: 'https://bsc-testnet.drpc.org'
}

// 3. Create modal
const metadata = {
  name: 'GTA FAN TOKEN',
  description: 'GTA Fan Token is the largest fan project of the GTA game.',
  url: 'https://gtafantoken', // origin must match your domain & subdomain
  icons: [Favicon]
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

function App() {
  return (
    <>
      <Helmet>
        <link rel="icon" href={Favicon} type="image/x-icon" />
      </Helmet>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GetAirdrop" element={<GetAirdrop />} />
        <Route path="/BuyToken" element={<BuyToken />} />
        <Route path="/WhitePaper" element={<WhitePaper />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
