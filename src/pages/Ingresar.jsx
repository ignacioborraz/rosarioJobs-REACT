import React, {useState,useContext,useRef} from 'react'
import {authContext} from '../context/AuthContext'
import {Link as LinkRouter} from "react-router-dom"

import Box from '@mui/material/Box'
import MailIcon from '@mui/icons-material/Mail'
import KeyIcon from '@mui/icons-material/Key'
import Typography from '@mui/material/Typography'

import '../App.css'

export default function Ingresar(props) {

    const [register,setRegister] = useState(false)
    const context = useContext(authContext)
    const mail = useRef()
    const pass = useRef()
    const name = useRef()

    const mainApi = "http://localhost:4000/api/"
    
    const handleRegister = (event) => {
        setRegister(!register)
    }

    const handleSignin = (event) => {
        event.preventDefault()
        fetch(mainApi+"auth/login", {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                email: mail.current.value,
                password: pass.current.value
            })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token",data.token)
            context.setAuth({
                id:data.user.id,
                name:data.user.name,
                logged:true
            })
            fetch(mainApi+"users", {
                headers:{"Authorization":"Bearer "+localStorage.getItem("token")}
            })
            .then(response => response.json())
            .then(data => console.log(data))
        })
        .catch(error => console.log(error))
    }

    const handleSignup = (event) => {
        event.preventDefault()
        fetch(mainApi+"auth/signup",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                name:name.current.value,
                email: mail.current.value,
                password:pass.current.value
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    return (
        <div className='home'>
            <div className='home-img' />
            <div className='home-ingreso'>
                <Typography variant="h1" sx={{fontFamily: 'Macondo', padding: '10px', color: 'white'}}>Bienvenido!</Typography>
                {register ? (
                    <form onSubmit={handleSignup} className='w100'>
                        <Box sx={{
                            display: 'flex',
                            width: '60%',
                            minWidth: '280px',
                            backgroundColor: 'rgb(0, 105, 192)',
                            border: '5px solid rgb(0, 105, 192)',
                            borderRadius: '50px'}}>
                            <label htmlFor="name">
                                <MailIcon sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    color: 'white',
                                    backgroundColor: 'rgb(0, 105, 192)',
                                    border: '0 solid rgb(0, 105, 192)',
                                    borderRadius: '50px 0 0 50px',
                                    padding: '10px'}}/>
                            </label>
                            <input type='text' name='name' id='name' placeholder='nombre' className='myInput' ref={name} required />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            width: '60%',
                            minWidth: '280px',
                            backgroundColor: 'rgb(0, 105, 192)',
                            border: '5px solid rgb(0, 105, 192)',
                            borderRadius: '50px'}}>
                            <label htmlFor="email">
                                <MailIcon sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    color: 'white',
                                    backgroundColor: 'rgb(0, 105, 192)',
                                    border: '0 solid rgb(0, 105, 192)',
                                    borderRadius: '50px 0 0 50px',
                                    padding: '10px'}}/>
                            </label>
                            <input type='email' name='email' id='email' placeholder='e-mail' className='myInput' ref={mail} required />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            width: '60%',
                            minWidth: '280px',
                            backgroundColor: 'rgb(0, 105, 192)',
                            border: '5px solid rgb(0, 105, 192)',
                            borderRadius: '50px',
                            marginTop: '5px'}}>
                            <label htmlFor="password">
                                <KeyIcon sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    color: 'white',
                                    backgroundColor: 'rgb(0, 105, 192)',
                                    border: '0 solid rgb(0, 105, 192)',
                                    borderRadius: '50px 0 0 50px',
                                    padding: '10px'}}/>
                            </label>
                            <input type='password' name='password' id='password' placeholder='contraseña' className='myInput' ref={pass} required />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '60%',
                            minWidth: '280px',
                            height: '50px',
                            borderRadius: '50px',
                            marginTop: '20px'}}>
                            <input type="submit" value='ingreso' className='myButton' required />
                            <div className='myButtonDiv'>registro</div>
                        </Box>
                    </form>

                ) : (
                    <form onSubmit={handleSignin} className='w100'>
                        <Box sx={{
                            display: 'flex',
                            width: '60%',
                            minWidth: '280px',
                            backgroundColor: 'rgb(0, 105, 192)',
                            border: '5px solid rgb(0, 105, 192)',
                            borderRadius: '50px'}}>
                            <label htmlFor="email">
                                <MailIcon sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    color: 'white',
                                    backgroundColor: 'rgb(0, 105, 192)',
                                    border: '0 solid rgb(0, 105, 192)',
                                    borderRadius: '50px 0 0 50px',
                                    padding: '10px'}}/>
                            </label>
                            <input type='email' name='email' id='email' placeholder='e-mail' className='myInput' value={mail} ref={mail} required />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            width: '60%',
                            minWidth: '280px',
                            backgroundColor: 'rgb(0, 105, 192)',
                            border: '5px solid rgb(0, 105, 192)',
                            borderRadius: '50px',
                            marginTop: '5px'}}>
                            <label htmlFor="password">
                                <KeyIcon sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    color: 'white',
                                    backgroundColor: 'rgb(0, 105, 192)',
                                    border: '0 solid rgb(0, 105, 192)',
                                    borderRadius: '50px 0 0 50px',
                                    padding: '10px'}}/>
                            </label>
                            <input type='password' name='password' id='password' placeholder='contraseña' className='myInput' value={pass} ref={pass} required />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '60%',
                            minWidth: '280px',
                            height: '50px',
                            borderRadius: '50px',
                            marginTop: '20px'}}>
                            <input type="submit" value='ingreso' className='myButton' required />
                            <div className='myButtonDiv'>registro</div>
                        </Box>
                    </form>
                )}
            </div>
        </div>
    )

}
