import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import hashMD5 from "md5";

export default function Transfer({ contractInfo }) {
  const [data, setData] = useState({
    productId: "",
    newOwnerId: "",
    prevOwnerId: "",
  });

  const InputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();

    const req = await contractInfo.contractInstace.methods
      .getProduct("f920e025-48b9-4e9a-ab1b-14194c7320a9")
      .call();

    let logId = uuidv4();
    const logMessage = `changing the owner of ${data.productId} product from ${data.prevOwnerId} to ${data.newOwnerId}`;
    console.log(
      data.productId,
      hashMD5(data.prevOwnerId),
      data.newOwnerId,
      hashMD5(data.newOwnerId),
      "1674468735",
      "Change Owner",
      logMessage
    );
    const transferReq = await contractInfo.contractInstace.methods
      .changeOwner(
        data.productId,
        hashMD5(data.prevOwnerId),
        data.newOwnerId,
        hashMD5(data.newOwnerId)
      )
      .send({
        from: contractInfo.contractActiveAddress,
      });
    console.log(transferReq);
  };

  return (
    <div>
      <h1 className="w-full text-3xl font-bold">Transfer Product</h1>
      <form className="mt-10 w-full">
        <div className="relative mb-4">
          <label for="name" className="leading-7 text-md text-gray-600">
            Product ID
          </label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={data.productId}
            onChange={InputChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="flex mb-4">
          <div className="relative mb-4 mr-5 w-1/2">
            <label for="name" className="leading-7 text-md text-gray-600">
              New Owner Id
            </label>
            <input
              type="text"
              id="newOwnerId"
              name="newOwnerId"
              value={data.newOwnerId}
              onChange={InputChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4 mr-5 w-2/5">
            <label for="name" className="leading-7 text-md text-gray-600">
              Prev Owner Addrees
            </label>
            <input
              type="text"
              id="prevOwnerId"
              name="prevOwnerId"
              value={data.prevOwnerId}
              onChange={InputChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <button
          className="bg-black rounded-lg text-white hover:bg-gray-800 hover:text-grey-600 py-4 w-full flex justify-center items-center"
          onClick={(e) => handleTransfer(e)}
        >
          <span className="mr-3 font-semibold leading-7">Transfer</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 -rotate-45"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
