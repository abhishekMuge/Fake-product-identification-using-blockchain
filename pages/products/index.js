import { useEffect, useState } from "react";
import hashMD5 from "md5";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerComponent from "../../utils/Drawer";

function allProducts({ contractInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customerProducts, setCustomerProducts] = useState({});
  const [currProd, setCurrProd] = useState([]);
  const [prodCodes, setProdCodes] = useState([]);
  const [customerDrawerState, setcustomerDrawerState] = useState(false);
  const [manufacturerDrawerState, setmanufacturerDrawerState] = useState(false);
  const [customerDetails, setcustomerDetails] = useState([]);

  useEffect(() => {
    fetchUserProducts()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const toggleDrawer = async (prodId) => {
    setIsOpen((prevState) => !prevState);
    setCurrProd(customerProducts[prodId]);
  };

  const userDrawerToggler = async (customerId, forSelector) => {
    // if (forSelector == "customer" && manufacturerDrawerState) {
    //   setmanufacturerDrawerState((prevState) => !prevState);
    //   setcustomerDrawerState((prevState) => !prevState);
    // }
    // if (forSelector == "manufacturer" && customerDrawerState) {
    //   setmanufacturerDrawerState((prevState) => !prevState);
    //   setcustomerDrawerState((prevState) => !prevState);
    // }
    let titles = [
      "name",
      "type",
      "phone_number",
      "account_address",
      "location_address",
    ];

    setcustomerDrawerState((prevState) => !prevState);
    const customerData = await contractInfo.contractInstace.methods
      .getCustomer(customerId)
      .call();

    let newCustomerData = {};
    let keys = Object.keys(customerData);
    keys.forEach((item) => {
      newCustomerData[titles[item]] = customerData[item];
    });

    setcustomerDetails(newCustomerData);
  };

  const fetchUserProducts = async () => {
    let allProducts = {};
    const hashKey = hashMD5(contractInfo.contractActiveAddress);
    const userProducts = await contractInfo.contractInstace.methods
      .getCustomerProducts(hashKey)
      .call();
    setProdCodes(userProducts);
    for (let i = 0; i < userProducts.length; i++) {
      const prodDetails = await contractInfo.contractInstace.methods
        .getProduct(userProducts[i])
        .call();

      allProducts[userProducts[i]] = prodDetails;
    }

    // Object.entries(allProducts).forEach(([key, value]) => {
    //   Object.values(allProducts[key]).forEach((key, val) => {
    //     if (val == 0) {
    //       console.log(key, val);
    //     }
    //   });
    // });

    // console.log(allProducts);
    setCustomerProducts(allProducts);
    setIsLoading(false);
  };

  return (
    <div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        size="70vw"
      >
        <div className="main-container m-3">
          <div className="close-btn flex">
            <button
              onClick={toggleDrawer}
              className="flex items-center justify-center w-full px-10 py-2 text-white transition-colors duration-200 transform bg-black rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-black focus:bg-black focus:ring focus:ring-black focus:ring-opacity-40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="mx-1">Close</span>
            </button>
          </div>
          <div className="container-body">
            <h1 className="my-3 text-2xl font-bold leading-2">
              Product Details
            </h1>
            <form>
              <div className="flex mb-4">
                <div class="relative mb-4 mr-5 w-1/3">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={currProd[0]}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div class="relative mb-4 mr-5 w-1/3">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Product Description
                  </label>
                  <input
                    type="text"
                    id="desc"
                    name="desc"
                    value={currProd[1]}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div class="relative mb-4 mr-5 w-1/3">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Owner ID
                  </label>
                  <input
                    type="text"
                    id="ownerId"
                    name="ownerId"
                    value={currProd[2]}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <span
                    className="cursor-pointer text-red-400"
                    onClick={() => userDrawerToggler(currProd[2], "customer")}
                  >
                    Get Owner Information
                  </span>
                </div>
                <div class="relative mb-4 mr-5 w-1/3">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Owner Address
                  </label>
                  <input
                    type="text"
                    id="owner_address"
                    name="owner_address"
                    value={currProd[3]}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div class="relative mb-4 mr-5 w-1/3">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Manufacturer Id
                  </label>
                  <input
                    type="text"
                    id="Manufacturer_id"
                    name="Manufacturer_id"
                    value={currProd[4]}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <span
                    className="cursor-pointer text-red-400"
                    onClick={() =>
                      userDrawerToggler(currProd[4], "manufacturer")
                    }
                  >
                    Get Manufacturer Information
                  </span>
                </div>
                <div class="relative mb-4 mr-5 w-1/3">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Manufacturer Address
                  </label>
                  <input
                    type="text"
                    id="Manufacturer_Address"
                    name="Manufacturer_Address"
                    value={currProd[5]}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div class="relative mb-4 mr-5 w-1/3">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Type Of Product
                  </label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={currProd[6]}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            </form>
            {/* prod Certificates => {currProd[7]}
            prod logsids => {currProd[8]} */}
            <div className="flex">
              <button className="flex items-center justify-center w-full px-10 py-2 text-white transition-colors duration-200 transform bg-black rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-black focus:bg-black focus:ring focus:ring-black focus:ring-opacity-40 mr-3">
                <span className="mx-1">Get Prodcut Certificates</span>
              </button>

              <button className="flex items-center justify-center w-full px-10 py-2 text-white transition-colors duration-200 transform bg-black rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-black focus:bg-black focus:ring focus:ring-black focus:ring-opacity-40 mr-3">
                <span className="mx-1">Go To Prodcut Logs</span>
              </button>
            </div>
          </div>
        </div>
      </Drawer>

      <DrawerComponent
        data={customerDetails}
        openState={customerDrawerState}
        toggleDrawer={userDrawerToggler}
        forSelector="customer"
      />

      <DrawerComponent
        data={customerDetails}
        openState={manufacturerDrawerState}
        toggleDrawer={userDrawerToggler}
        forSelector="manufacturer"
      />

      <section className="flex flex-col m-2 ">
        {/* header section start here */}
        <div className="flex justify-around w-full">
          <h1 className="w-full text-3xl font-bold">All Prodcuts</h1>
          <button className="flex items-center justify-center w-full px-10 py-2 text-white transition-colors duration-200 transform bg-black rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-black focus:bg-black focus:ring focus:ring-black focus:ring-opacity-40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <span className="mx-1">Refresh</span>
          </button>
        </div>
        {/* header section end here */}
        {/* ----------------------------------------------------- */}
        {/* search bar start */}
        <div className="flex items-center">
          <div className="flex w-3/4">
            <section className="relative w-full py-4 rounded-md">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-1 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-800 focus:border-black dark:focus:border-black focus:outline-none"
                  placeholder="Type products name or code..."
                />
              </div>
            </section>
          </div>
        </div>
        {/* search bar end here */}
        {!isLoading && (
          <div className="w-3/4 flex flex wrap">
            {prodCodes.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => toggleDrawer(item)}
                  className="cursor-pointer flex flex-col justify-center items-center w-36 h-36 border-2 mx-4 rounded-lg drop-shadow-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                    />
                  </svg>
                  <div>
                    {Object.values(customerProducts[item]).map((key, val) => {
                      return <p>{val == 0 && <span>{key}</span>}</p>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default allProducts;
