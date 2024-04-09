import { Container } from 'react-bootstrap';
import Body1 from '../components/body1/body1';
import Body2 from '../components/body2/body2';
import Header from '../components/header/header';
import Navigation from '../components/navigation/nav';
import './Home.css'
import Footer from '../components/footer/footer';
import { useState } from 'react';
import { DNA } from 'react-loader-spinner';

export default function Home(){
    const [loading, setLoading] = useState(true);

    if(loading){
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }
    

    return(
        <>
        {
            loading ? 
            <div className='Loading-css'>
                <h1 className='title-text'>LOADING</h1>
                <p>Welcome to Gta Fan Token</p>
                <DNA
                    visible={true}
                    height="220"
                    width="220"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
            :
            <div>
                <Navigation/>
                <Container fluid={'xxxl'}>
                    <Header />
                    <Body1 />
                    <Body2 />
                </Container>
                <Footer />
            </div>
        }
        </>
    )
}