import "./Main.css";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Navbar from "../Navbar/Navbar";
const clientFactoryAddress = "0x024794804cAE60F10392a18c29f92be7515f7174";
const sepoliaRPCUrl =
  "https://sepolia.infura.io/v3/67bc1009f5a547cc978659e13579ddf0";

const Main = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log("Connected to Ethereum account: ", accounts[0]);
        console.log("Account ", account);
        console.log(typeof accounts[0]);
        window.ethereum.on("accountsChanged", (newAccounts) => {
          setAccount(newAccounts[0]);
          console.log("Switched to account: ", newAccounts[0]);
        });
      } else {
        console.log("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask: ", error);
    }
  };

  useEffect(() => {
    const web3Instance = new Web3(sepoliaRPCUrl);
    console.log(web3Instance);
    setWeb3(web3Instance);
    connectWallet();
    console.log("Web3 instance set up: ", web3);
  }, []);

  return (
    <div className="banner">
      <Navbar />
      <div className="content">
        {!account ? (
          <button className="connect-wallet-button" onClick={connectWallet}>
            Connect with metamask
          </button>
        ) : (
          <p>Logged as: {account}</p>
        )}

        <h1>PERSONAL HEALTHCARE RECORD</h1>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>

        <div>
          <button type="button">
            <span></span>Login
          </button>
          <button type="button">
            <span></span>Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
