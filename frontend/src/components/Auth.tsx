import type { SignupInput } from "@noisytech/medium-common";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate=useNavigate();

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signup"? "signup" : "signin"}`,postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        }
        catch(e){
            alert(`Error while ${type==="signin"? "Logging In!!": "Sign UP!!"}`)
            //alert user here that the req failed
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl text-center font-extrabold">
                        Create an Account
                    </div>
                    <div className="text-slate-400 text-center">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Create Account" : "Login"}</Link>
                    </div>
                </div>
                <div className="pt-8">
                    {type === "signup" ?
                        <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} />
                        : null}
                    <LabelledInput label="Email" placeholder="abc@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                </div>
                <div className="pt-8">
                    <button onClick={sendRequest}    className="bg-black w-full hover:bg-gray-500 text-white font-semibold py-2 px-4 border border-blue-700 rounded-lg">
                        {type === "signin" ? "Sign In" : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    </div >
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <div>
            <form>
                <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
                <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder={placeholder} required />
            </form>
        </div>
    </div>
}