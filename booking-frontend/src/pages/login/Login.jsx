import { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { AuthContext } from "../../components/context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [ credentials, setCredentials ] = useState({
        name: undefined,
        password: undefined
    }) 

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(prev => ({
            ...prev, [e.target.id]: e.target.value
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START"})

        try {
            const res = await axios.post("/auth/login", credentials)

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate("/")
        }
        catch (err) {
            dispatch({ type: "LOGIN_ERROR", payload: err.response.data })
        }
    }

    return (
        <div className="login">
            <div className="loginContainer">
                <h1>Welcome to BSD House Website</h1>
                <input type="text" className="loginInput" placeholder="Name" id="name" onChange={handleChange}/>
                <input type="password" className="loginInput" placeholder="Password" id="password" onChange={handleChange}/>
                <button className="loginButton" onClick={handleLogin} disabled={loading}>Login</button>
                {error && <span> { error.message } </span>}
            </div>
        </div>
    )
}

export default Login;