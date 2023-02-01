import Web3 from "web3";
import { abi } from "../smart_contract/artifacts/contracts/Authentifi.sol/Authentifi.json";

let web3 = undefined;
let contractActiveAddress = undefined;
let contractInstace = undefined;

const contractAddress = "0xE7a0D047279E13cd17803da2cF70167940a6243b";
const contractABI = abi;

export const loadContract = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      // console.log("test1");
      /* request wallet connection */
      await window.ethereum.request({ method: "eth_requestAccounts" });
      /* create web3 instance & set to state */
      const web3 = new Web3(window.ethereum);
      /* get list of accounts */
      const accounts = await web3.eth.getAccounts();
      /* set account 1 to React state */
      contractActiveAddress = accounts[0];

      const AuthentifiInstance = new web3.eth.Contract(
        contractABI,
        contractAddress
      );
      contractInstace = AuthentifiInstance;

      window.ethereum.on("accountsChanged", async () => {
        const accounts = await web3.eth.getAccounts();
        //   console.log(accounts[0]);
        /* set account 1 to React state */
        contractActiveAddress = accounts[0];
      });
      // store the contract instance and account address over global state
      // console.log("connectedAccount", contractActiveAddress);
      // console.log("contractInstance", AuthentifiInstance);
      return { contractActiveAddress, contractInstace };
    } catch (error) {
      console.log(error);
    }
  }
};

export const contractInfo = { contractActiveAddress, contractInstace };
