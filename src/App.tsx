import { useState } from 'react';
import './App.css'
import{ethers} from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract";


function App() {
  const[address,setAddress] = useState("")
  const[balance,setBalance] = useState("0")
  const[depositAmount,setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [transferTo, setTransferTo] = useState("")
  async function connectWallet(){
    if(!window.ethereum)
      return alert("Please install MetaMask")
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    console.log("Connected chain ID:", network.chainId);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const balance = await contract.getBalance();
    setBalance(ethers.formatEther(balance));
  }
  async function deposit(amountInEth: string){
    if(!window.ethereum)
      return alert("Please install MetaMask")
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const tx = await contract.deposit({value: ethers.parseEther(amountInEth)});
    await tx.wait();
    const balance = await contract.getBalance();
    setBalance(ethers.formatEther(balance));
  }

  async function withdraw(amountInEth: string){
    if(!window.ethereum)
      return alert("Please install MetaMask")
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const tx = await contract.withdraw(ethers.parseEther(amountInEth));
    await tx.wait();
    const balance = await contract.getBalance();
    setBalance(ethers.formatEther(balance));
  }


  async function transfer(to: string, amountInEth: string){
    if(!window.ethereum)
      return alert("Please install MetaMask")
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const tx = await contract.transfer(to, ethers.parseEther(amountInEth));
    await tx.wait();
    const balance = await contract.getBalance();
    setBalance(ethers.formatEther(balance));
  }


  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <p>Balance: {balance} ETH</p>
      <p>Connected Address: {address}</p>
      <input type="text" placeholder="Deposit Amount in ETH" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
      <button onClick={() => deposit(depositAmount)}>Deposit</button><br/>
      <input type="text" placeholder="Withdraw Amount in ETH" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
      <button onClick={() => withdraw(withdrawAmount)}>Withdraw</button><br/>
      <input type="text" placeholder="Transfer To Address" value={transferTo} onChange={(e) => setTransferTo(e.target.value)} />
      <input type="text" placeholder="Transfer Amount in ETH" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
      <button onClick={() => transfer(transferTo, transferAmount)}>Transfer</button>
    </div>
  )
}

export default App
