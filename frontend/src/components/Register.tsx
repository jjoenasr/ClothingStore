import React, { useState } from 'react'
import { register } from '../services/authServices'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const [errors, setErrors] = useState<string []>([])
    const navigate = useNavigate()

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        setErrors([])
        if ((email === '') || (password === '')){
            setErrors([...errors ,'Missing Fields'])
        }
        if ((password !== password2)){
            setErrors([...errors ,'Passwords dont match'])
        }
        if(!errors.length){
            try {
                await register(firstName, lastName, email, phone, password)
    
                toast.success('Account created, please log in!', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: true,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                });
                navigate('/login');
    
            } catch (error: any) {
                setErrors(prevErros => [...errors, `Error: ${error.message}`]);
                console.error(error);
            }
        }
    }
    return (
        <div className='w-full max-w-md mx-auto pt-8'>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                        First Name
                    </label>
                    <input
                    className="form-control"
                    id="first-name"
                    type="text"
                    placeholder="Jane"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value)}}
                    />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 border-gray-200 text-xs font-bold mb-2" htmlFor="last-name">
                        Last Name
                    </label>
                    <input
                    className="form-control"
                    id="last-name"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value)}}
                    />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className='w-full px-3 mb-2'>
                        <label className="block uppercase text-gray-700 text-sm font-bold mb-2" htmlFor="inputPhone">Tel</label>
                        <input
                            type="tel" 
                            name="phone" 
                            id="inputPhone" 
                            className="form-control" 
                            pattern="[0-9]{2}-[0-9]{6}"
                            placeholder='99-999999'
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value)}} 
                        />
                        <p className="text-gray-600 text-xs italic">Optional</p>
                    </div>
                    <div className="w-full px-3 mb-4">
                        <label className="block uppercase text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="janedoe@example.com"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => { setEmail(e.target.value)}}
                        />
                    </div>
                    <div className="w-full px-3 mb-6">
                    <label className="block  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                    className="form-control"
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value)}}
                    />
                    <p className="text-gray-600 text-xs italic">Your password must be 8-20 characters long</p>
                    </div>
                    <div className="w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password2">
                        Re Password
                    </label>
                    <input
                    className="form-control"
                    id="password2"
                    type="password2"
                    placeholder="********"
                    value={password2}
                    onChange={(e) => { setPassword2(e.target.value)}}
                    />
                    {errors.length > 0 && (
                        <p className="text-red-500 text-xs italic">{errors[errors.length - 1]}</p>
                    )}
                    </div>
                    <div className="mx-auto">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    >
                        Sign Up
                    </button>
                </div>
                </div>
            </form> 
        </div>
    )
}

export default Register
