import { useRouter } from "next/router";
import React, { useState } from "react";
import Web3 from "web3";
import Profile from "../../components/Dashboard/Profile";

const Login = () => {
  const [error, setError] = useState("");
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAddress(accounts[0]);
        setIsLoggedIn(true);
        console.log("Address----------->" + accounts[0]);
        router.push({
          pathname: "/dashboard",
          query: { address: accounts[0] },
        });
      } catch (error) {
        console.error(error);
        setError("Error connecting to Metamask");
      }
    } else {
      console.error("Metamask not detected");
      setError(
        "Metamask not detected. Please install Metamask to use this application."
      );
    }
  };

  const handleLogout = () => {
    setWeb3(null);
    setAddress("");
    setIsLoggedIn(false);
    window.localStorage.clear();
    window.location.reload(true);
  };

  if (isLoggedIn) {
    return <Profile address={address} handleLogout={handleLogout} />;
  }

  return (
    <div>
      <h1>Login</h1>
      {web3 ? (
        <div>
          <p>Connected with address: {address}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={connectMetamask}>Connect with Metamask</button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
