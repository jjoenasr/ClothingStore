import React, { useState } from 'react'
import { useStore } from '../contexts/StoreContext'
import { login } from '../services/authServices'
import { Link, useNavigate } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'
import { MdOutlineAlternateEmail } from "react-icons/md";

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<string []>([])
    const { setToken, removeToken } = useStore()
    const navigate = useNavigate();

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        try {
        removeToken()
        const token = await login(email, password)
        setToken(token)
        console.log('Submitted:', { email, password });
        navigate('/store');
        } catch(error:any){
            setErrors(prevErrors => [...prevErrors, `Error: ${error.message}`]);
            console.error(error);
        }


    }
    return (
        <div className="w-full max-w-xs mx-auto pt-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4 mb-4" onSubmit={handleSubmit}>
                <h2 className='font-bold text-center mb-6 text-4xl'>Sign In</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                        <MdOutlineAlternateEmail className='h-5 w-5 text-gray-400' />
                        <input
                        className="pl-3 outline-none border-none w-full text-gray-700"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="guest@example.com"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => { setEmail(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                        <FaLock className="h-5 w-5 text-gray-400"/>
                        <input
                        className="pl-3 outline-none border-none w-full text-gray-700"
                        id="password"
                        name='password'
                        type="password"
                        required
                        placeholder="************"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value)}}
                    />
                    </div>
                    {errors.length > 0 && (
                        <p className="text-red-500 text-xs italic">{errors[errors.length - 1]}</p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    >
                        Sign In
                    </button>
                    <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/register">
                        Register
                    </Link>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2024 Acme Corp. All rights reserved.
            </p>
        </div>
    )
}

export default Login
