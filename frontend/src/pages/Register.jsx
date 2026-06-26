import {useNavigate} from "react-router-dom";
import {useState} from "react";
import api from "../api/axios.js";
import {useAuth} from "../contexts/authContext.jsx";


export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!email || !password || !username || !firstname || !lastName){
            setError("Please fill all the fields !");
            return;
        }
        setError("");
        try{
            const response = await api.post("/auth/register", {firstname, lastname, email, password, username});
            login(response.data.user, response.data.token);
            navigate("/");
            console.log(response.data);
        } catch(err){
            setError(err.message);
            console.error("Registration error : ", err.message);
        }
    }

    return(
        <div>
            <div className="register-container">
                <h1 className="register-title">Sign Up</h1>
                <div className="register-inputs">
                    <input type="text" placeholder="First Name..." value={firstname} onChange={(e)=>setFirstname(e.target.value)} />
                    <input type="text" placeholder="Last Name..." value={lastname} onChange={(e)=>setLastname(e.target.value)} />
                    <input type="email" placeholder="Email..." value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password..." value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <input type="text" placeholder="Username..." value={username} onChange={(e)=>setUsername(e.target.value)} />
                    <button className="submit-register" onClick={handleSubmit} />
                    <p className="register-link">Already have an account? <span onClick={()=>navigate("/login")}>Sign In</span></p>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
}