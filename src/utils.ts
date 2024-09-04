export const getExplorerUrl = (hash: string, chainId?: number) => {
  if (chainId === 84532) {
    // Base Goerli (testnet)
    return `https://sepolia.basescan.org/tx/${hash}`;
  } else if (chainId === 8453) {
    // Base Mainnet
    return `https://basescan.org/tx/${hash}`;
  } else {
    // Default to Base sepolia if chain is unknown
    return `https://sepolia.basescan.org/tx/${hash}`;
  }
};
