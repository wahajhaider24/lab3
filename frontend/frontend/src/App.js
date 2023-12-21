
import './App.css';

import React, { useEffect,useState } from 'react';

import abi from './abi.json'
import { ethers } from 'ethers';

// Replace with your actual ABI file
const contractAddress = '0x203F9C34BbAB4c538b93D1C52077E4d8115C09f7'; 

function App() {
  const [storedConversion, setStoredConversion] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [selectedPair, setSelectedPair] = useState(null);

  const handleRadioChange = async (pair) => {
    setSelectedPair(pair);
    // You can perform additional actions or pass the value to a parent component here
    if (pair === 'BTC/USD') {
    
      alert('Handling BTC/USD...');

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

    

      // Connect to the contract
      const contract = new ethers.Contract(contractAddress, abi, provider);

      // Call the contract method
      const storedConversionWei = await contract.storedBTCToUSDConversion();

      

      // Convert the value to decimal (18 decimals assumed)
      const storedConversionDecimal = ethers.utils.formatUnits(storedConversionWei, 7);

      // Set the value in the state
      setStoredConversion(storedConversionDecimal);
    } else if (pair === 'ETH/USD') {
     
      alert('Not Available');
    } else if (pair === 'LINK/ETH') {
      alert('Not Available');
    } else if (pair === 'BTC/ETH') {
      alert('Not Available');
    }
  };

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      // Handle MetaMask events (e.g., account change)
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount('');
          setIsConnected(false);
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        // Handle chain change
        console.log('MetaMask chain changed:', chainId);
      });
    }
  }, []);

  const handleConnect = async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Update state with the connected account
        setAccount(accounts[0]);
        setIsConnected(true);

        console.log('Connected to MetaMask');
      } catch (error) {
        // Handle error (user denied account access)
        console.error('Error connecting to MetaMask:', error);
        setIsConnected(false);
      }
    } else {
      // MetaMask is not installed, prompt user to install
      console.error('MetaMask not found. Please install MetaMask to use this feature.');
    }
  };

   const handleMint =  async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transaction = await contract.mint(); // Replace 'mint' with the actual function name in your smart contract
      await transaction.wait();
      console.log('Mint successful!');
    } catch (error) {
      console.error('Error minting:', error.message);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
       
        <a
          className='Header'
        >
          CHAINLINK PAIR CONVERSION
        </a>

        {isConnected ? (
        <div>
          <p>Connected Account: {account}</p>
          <div>
          <div>
      <p>Stored BTC to USD Conversion: {storedConversion}</p>
    </div>
      <label>
        <input
          type="radio"
          value="BTC/USD"
          checked={selectedPair === 'BTC/USD'}
          onChange={() => handleRadioChange('BTC/USD')}
        />
        BTC/USD
      </label>

      <label>
        <input
          type="radio"
          value="ETH/USD"
          checked={selectedPair === 'ETH/USD'}
          onChange={() => handleRadioChange('ETH/USD')}
        />
        ETH/USD
      </label>

      <label>
        <input
          type="radio"
          value="LINK/ETH"
          checked={selectedPair === 'LINK/ETH'}
          onChange={() => handleRadioChange('LINK/ETH')}
        />
        LINK/ETH
      </label>

      <label>
        <input
          type="radio"
          value="BTC/ETH"
          checked={selectedPair === 'BTC/ETH'}
          onChange={() => handleRadioChange('BTC/ETH')}
        />
        BTC/ETH
      </label>
    </div>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect to MetaMask</button>
      )}
     

      </header>
    </div>
  );
}

export default App;
