/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";    
import { useDispatch } from "react-redux";
import { signin } from "../../slices/authSlice";

const auth = () => {    
    const dispatch = useDispatch();
    const [Type, setType] = useState("Customer");
    const [warning, setWarning] = useState(false);        
    const [data, setData] = useState({
        account_address: "",
        password: "",
    });  
    
    const InputChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(signin(data));
        console.log(data);
    };

    return (
        <div className="bg-slate-400 min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-10 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign In</h1>
                        
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="account_address"        
                            value={data.account_address}
                            onChange={InputChange}                
                            placeholder="Account ID" />
                                            
                        <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"      
                            value={data.password}
                            onChange={InputChange}                  
                            placeholder="Password" />
                
                        <button
                            type="submit"
                            onClick={(e) => handleSignUp(e)}
                            className="w-full text-center py-3 rounded bg-black text-white hover:bg-gray-800 focus:outline-none my-1">Login</button>
                    </div>

                    
                </div>
            </div>
    );                            
};

export default auth;
