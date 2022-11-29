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
        <div className="bg-slate-400 min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-10 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="name"     
                            value={data.name}
                            onChange={InputChange}                   
                            placeholder="Full Name" />

                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="account_address"        
                            value={data.account_address}
                            onChange={InputChange}                
                            placeholder="Account ID" />
                        
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="phone_number"        
                            value={data.phone_number}
                            onChange={InputChange}                
                            placeholder="Phone Number" />

                        <select className="block border border-grey-light w-full p-3 rounded mb-4" name="type_of"                        
                            onChange={(e) => {
                                setType(e.target.value);
                                data.type_of = e.target.value;
                            }}
                        >
                            <option value="Customer">Customer</option>
                            <option value="Manufacturer">Manufacturer</option>                            
                        </select>

                        <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"      
                            value={data.password}
                            onChange={InputChange}                  
                            placeholder="Password" />

                        <div>
                            <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"      
                            onChange={(e) => {
                                if(e.target.value !== data.password){
                                    setWarning(true);
                                } else {
                                    setWarning(false);
                                }
                            }}               
                            placeholder="Confirm Password" />
                            {warning && (                                
                                <p className="text-alert">Password does not match</p>
                            )}
                        </div>
                        

                        <button
                            type="submit"
                            onClick={(e) => handleSignUp(e)}
                            className="w-full text-center py-3 rounded bg-black text-white hover:bg-gray-800 focus:outline-none my-1">Create Account</button>
                    </div>

                    
                </div>
            </div>
    );                            
};

export default auth;
