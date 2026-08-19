import { useState } from 'react';
import './App.css'
import{ethers} from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract";


function App() {
  const[address,setAddress] = useState("")
  const[balance,setBalance] = useState("0")
  async function connectWallet(){
    if(!window.ethereum)
      return alert("Please install MetaMask")
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const balance = await contract.getBalance();
    setBalance(ethers.formatEther(balance));
  }

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <p>Balance: {balance} ETH</p>
      <p>Connected Address: {address}</p>
    </div>
  )
}

export default App
