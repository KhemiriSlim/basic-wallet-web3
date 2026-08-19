export const CONTRACT_ADDRESS = "0x75ae07B1fc58ba21CE19d810052aE826a3E1eCce";

export const CONTRACT_ABI = [
  "function owner() view returns (address)",
  "function balances(address) view returns (uint256)",
  "function deposit() payable",
  "function getBalance() view returns (uint256)",
  "function withdraw(uint256 amount)",
  "function transfer(address to, uint256 amount)"
];

export const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111 in hex