/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../slices/authSlice";

const auth = () => {
  const dispatch = useDispatch();
  const [Type, setType] = useState("Customer");
  const [warning, setWarning] = useState(false);
  const [data, setData] = useState({
    name: "",
    type_of: Type,
    phone_number: "",
    account_address: "",
    password: "",
  });

  const InputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signup(data));
    console.log(data);
  };

  return (
    <div>
      <section className="h-full gradient-form bg-gray-200 md:h-screen">
        <div className="container py-12 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      <form>
                        <p className="mb-4">Create your new account</p>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            name="name"
                            value={data.name}
                            onChange={InputChange}
                            placeholder="Enter your Name"
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            name="account_address"
                            value={data.account_address}
                            onChange={InputChange}
                            placeholder="your current conected account address"
                            disabled
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            name="phone_number"
                            value={data.phone_number}
                            onChange={InputChange}
                            placeholder="Phone Number"
                          />
                        </div>
                        <div className="mb-4">
                          <select
                            className="block border border-grey-light w-full p-2 rounded mb-4"
                            name="type_of"
                            onChange={(e) => {
                              setType(e.target.value);
                              data.type_of = e.target.value;
                            }}
                          >
                            <option value="None">
                              Select category of user
                            </option>
                            <option value="Customer">Customer</option>
                            <option value="Manufacturer">Manufacturer</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            name="password"
                            value={data.password}
                            onChange={InputChange}
                            placeholder="Password"
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            name="confirm_password"
                            onChange={(e) => {
                              if (e.target.value !== data.password) {
                                setWarning(true);
                              } else {
                                setWarning(false);
                              }
                            }}
                            placeholder="Confirm Password"
                          />
                          {warning && (
                            <p className="text-alert">
                              Password does not match
                            </p>
                          )}
                        </div>
                        <div className="text-center pt-1 mb-12 pb-1">
                          <button
                            className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            type="submit"
                            onClick={(e) => handleSignUp(e)}
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            style={{
                              background:
                                "linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)",
                            }}
                          >
                            Create Account
                          </button>
                        </div>
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Already registered!</p>
                          <button
                            type="button"
                            className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            Login Here
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="lg:w-6/12 flex items-center justify-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          alt="logo"
                        />
                        <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                          Authentifi
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default auth;
