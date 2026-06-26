import {useState} from "react";
import {useAuth} from "../contexts/authContext.jsx";
import api from "../api/axios.js";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!email || !password){
            setError("Please fill all the fields !");
            return;
        }
        try{
            const response = await api.post("/auth/login", {email, password});
            login(response.data.user, response.data.token);
            navigate('/');
            console.log(response.data);
        }catch(err){
            setError(`error : ${err}`);
        }
    }
    return(
        <div>
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                <div className="inputs">
                    <input type="email" placeholder="Email..." value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password..." value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button className="submit-login" onClick={handleSubmit} />
                    <p className="register-link">You don't have an account? <span onClick={()=>navigate("/register")}>Sign Up</span></p>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
}