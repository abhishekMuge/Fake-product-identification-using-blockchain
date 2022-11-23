import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../smart_contract/artifacts/contracts/Authentifi.sol/Authentifi.json";

const Web3 = require("web3");
const contractAddress = "0xc7BBF1283f5955F53eaE43Dce46EA2C23b68BC90";
const contractABI = abi.abi;

export default function Home() {
  const [connectedAccount, setConnectedAccount] = useState(undefined);
  const [contractInstance, setContractInstance] = useState(undefined);
  const [web3, setWeb3] = useState();
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    loadContract();
  }, [contractInstance]);

  const loadContract = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      setError("");
      setSuccessMsg("");
      try {
        /* request wallet connection */
        await window.ethereum.request({ method: "eth_requestAccounts" });
        /* create web3 instance & set to state */
        const web3 = new Web3(window.ethereum);
        /* set web3 instance in React state */
        setWeb3(web3);
        /* get list of accounts */
        const accounts = await web3.eth.getAccounts();
        /* set account 1 to React state */
        setConnectedAccount(accounts[0]);

        const AuthentifiInstance = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        setContractInstance(AuthentifiInstance);

        window.ethereum.on("accountsChanged", async () => {
          const accounts = await web3.eth.getAccounts();
          console.log(accounts[0]);
          /* set account 1 to React state */
          setConnectedAccount(accounts[0]);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Head>
        <title>Authentifi</title>
        <meta
          name="description"
          content="Validate Fake products, powered by Blockchain Technology"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="text-gray-600 body-font mx-10">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl">Authentifi</span>
          </a>
        </div>
      </header>

      <section className="text-gray-600 body-font mx-10">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Before they sold out
              <br className="hidden lg:inline-block" />
              readymade gluten
            </h1>
            <p className="mb-8 leading-relaxed leading-7 font-semibold text-justify">
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra
              air plant cold-pressed tacos poke beard tote bag. Heirloom echo
              park mlkshk tote bag selvage hot chicken authentic tumeric
              truffaut hexagon try-hard chambray.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-gray-800 border-0 py-3 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg">
                Create Account
              </button>
              <button className="inline-flex ml-4 bg-white text-black border-2 border-black py-3 px-6 rounded text-lg font-semibold">
                Login
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://dummyimage.com/720x600"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
