import { Button } from "@/components/ui/button";
import { connectWalletReq } from "@/services/chainnotify.services";
import { ethers } from "ethers";
import { Wallet, ClipboardCopy, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Storages } from "@/lib/helpers";
import { StorageKeysEnum, UserAuthInfoInt } from "@/types";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
type Props = {
  classname?: string;
}
export function WalletConnectButton({ classname} : Props) {
  const [walletState, setWalletState] = useState({
    address: "",
    balance: "",
    error: "",
    isConnecting: false,
    isCopied: false,
    isConnected: false
  });

  const user = Storages.getStorage("local", StorageKeysEnum.user) as UserAuthInfoInt;
  const storedAddress = user?.wallet?.address || "";

  const getProvider = (): ethers.providers.Web3Provider | null => {
    if (!window?.ethereum) return null;
    return new ethers.providers.Web3Provider(window.ethereum);
  };

  const checkConnection = async () => {
    const provider = getProvider();
    if (!provider) return false;

    try {
      const accounts = await provider.listAccounts();
      return accounts.length > 0;
    } catch (error) {
      console.error("Failed to check connection:", error);
      return false;
    }
  };

  const updateWalletInfo = async () => {
    const provider = getProvider();
    if (!provider) return;

    try {
      const isConnected = await checkConnection();
      if (!isConnected) {
        setWalletState(prev => ({
          ...prev,
          address: "",
          balance: "",
          isConnected: false
        }));
        return;
      }

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await signer.getBalance();
      
      setWalletState(prev => ({
        ...prev,
        address,
        balance: ethers.utils.formatEther(balance),
        isConnected: true
      }));
    } catch (error) {
      console.error("Failed to update wallet info:", error);
      setWalletState(prev => ({
        ...prev,
        address: "",
        balance: "",
        isConnected: false
      }));
    }
  };

  useEffect(() => {
    const initializeWallet = async () => {
      if (storedAddress) {
        const isConnected = await checkConnection();
        if (isConnected) {
          setWalletState(prev => ({ ...prev, address: storedAddress }));
          updateWalletInfo();
        } else {
          setWalletState(prev => ({
            ...prev,
            address: "",
            balance: "",
            isConnected: false
          }));
        }
      }
    };

    initializeWallet();
    setupEventListeners();
    return cleanupEventListeners;
  }, []);

  const setupEventListeners = () => {
    if (!window.ethereum) return;

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
    window.ethereum.on("disconnect", handleDisconnect);
  };

  const cleanupEventListeners = () => {
    if (!window.ethereum) return;

    window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    window.ethereum.removeListener("chainChanged", handleChainChanged);
    window.ethereum.removeListener("disconnect", handleDisconnect);
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      setWalletState(prev => ({
        ...prev,
        address: "",
        balance: "",
        isConnected: false
      }));
    } else {
      await updateWalletInfo();
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const handleDisconnect = () => {
    setWalletState(prev => ({
      ...prev,
      address: "",
      balance: "",
      isConnected: false
    }));
  };

  const connectWallet = async () => {
    const provider = getProvider();
    if (!provider) {
      setWalletState(prev => ({
        ...prev,
        error: "Please install MetaMask!"
      }));
      return;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true, error: "" }));

    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      
      await connectWalletReq(user?.email || "", address);
      await updateWalletInfo();
    } catch (error) {
      setWalletState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to connect wallet"
      }));
    } finally {
      setWalletState(prev => ({ ...prev, isConnecting: false }));
    }
  };

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setWalletState(prev => ({ ...prev, isCopied: true }));
      setTimeout(() => {
        setWalletState(prev => ({ ...prev, isCopied: false }));
      }, 2000);
    } catch (error) {
      setWalletState(prev => ({
        ...prev,
        error: "Failed to copy address"
      }));
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getEtherscanLink = (address: string) => {
    return `https://etherscan.io/address/${address}`;
  };

  return (
    <div className={`space-y-4 ${classname} `}>
      {walletState.error && (
        <Alert variant="destructive">
          <AlertDescription className="text-xs">
            {walletState.error}
          </AlertDescription>
        </Alert>
      )}

      <Button
        className="bg-accent hover:bg-accent/80 text-accent-foreground w-full"
        onClick={connectWallet}
        disabled={walletState.isConnected || walletState.isConnecting}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {walletState.isConnecting 
          ? "Connecting..." 
          : walletState.isConnected 
            ? "Connected" 
            : "Connect Wallet"
        }
      </Button>

      {walletState.isConnected && walletState.address && (
        <Card className="mt-4">
          <CardContent className="pt-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Address:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono">
                  {truncateAddress(walletState.address)}
                </span>
                <button
                  onClick={() => copyToClipboard(walletState.address)}
                  className="hover:text-primary transition-colors"
                  title={walletState.isCopied ? "Copied!" : "Copy address"}
                >
                  <ClipboardCopy className="h-4 w-4" />
                </button>
                <a
                  href={getEtherscanLink(walletState.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  title="View on Etherscan"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            {walletState.balance && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Balance:</span>
                <span className="text-xs font-mono">
                  {parseFloat(walletState.balance).toFixed(4)} ETH
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default WalletConnectButton;