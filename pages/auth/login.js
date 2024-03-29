/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, signin } from "../../slices/authSlice";
import hashMD5 from "md5";
import { useRouter } from "next/router";

const Login = ({ contractInfo }) => {
  const dispatch = useDispatch();
  const Router = useRouter();

  // const [Type, setType] = useState("Customer");
  // const [warning, setWarning] = useState(false);
  const [password, setPassword] = useState("");
  const login = useSelector((state) => state.auth);

  const getCustomer = async () => {
    const hashKey = hashMD5(contractInfo.contractActiveAddress);
    const data = await contractInfo.contractInstace.methods
      .getCustomer(hashKey)
      .call();
    console.log(data);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(
      signin({
        account_address: contractInfo.contractActiveAddress,
        password: password,
      })
    );
    // dispatch(authActions.setName(Type));

    const customerData = await getCustomer();
    console.log("get Customer: ", customerData);
    // console.log(data);
    // router.push("/products");
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
                        <p className="mb-4">Please login to your account</p>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            name="account_address"
                            value={contractInfo.contractActiveAddress}
                            placeholder="Your current account address ..."
                            disabled
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                          />
                        </div>
                        <div className="text-center pt-1 mb-12 pb-1">
                          <button
                            className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            type="submit"
                            onClick={(e) => 
                                handleSignUp(e)                                                              
                            }
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            style={{
                              background:
                                "linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)",
                            }}                          
                          >
                            Log in
                          </button>
                          <a className="text-gray-500" href="#!">
                            Forgot password?
                          </a>
                        </div>
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Do not have an account?</p>
                          <button
                            type="button"
                            className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={() => Router.push("/auth/register")}
                          >
                            Register Here
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
                        <image
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

export default Login;
