import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImage from './bg1.jpg';
import bgImage1 from './bg2.jpg';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate("/chat");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div
  className="min-h-screen bg-cover bg-center flex items-center justify-center relative overflow-hidden"
  style={{ backgroundImage: `url(${bgImage})` }}
>
      {/* Optional Blur/Glow Shapes */}
      <div className="absolute w-[300px] h-[300px] bg-gray/10 blur-3xl rounded-full -top-20 -left-20 z-0" />
      <div className="absolute w-[200px] h-[200px] bg-gray/10 blur-2xl rounded-full bottom-10 right-10 z-0" />
      <div className="absolute w-[150px] h-[150px] bg-gray/5 blur-2xl rounded-full top-20 right-20 z-0" />

      {/* Login Card */}
      <div className="relative z-10 bg-gray bg-opacity-10 backdrop-blur-2xl p-8 rounded-3xl w-full max-w-md text-gray shadow-2xl border border-gray/20"
            style={{ backgroundImage: `url(${bgImage1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
        {/* Foreground Image inside login box */}
       

        <h3 className="text-3xl font-bold mb-6 text-center">Login</h3>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="username@gmail.com"
            className="w-full p-3 rounded-lg bg-gray bg-opacity-20 placeholder-gray focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray bg-opacity-20 placeholder-gray focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-sm text-right hover:underline cursor-pointer">
            Forgot Password?
          </p>
          <button
            type="submit"
            className="w-full py-3 bg-gray-400 text-white hover:bg-white hover:text-black rounded-lg font-semibold transition"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white">or continue with</div>

        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
          try {
            const decoded = jwtDecode(credentialResponse.credential);
            const email = decoded.email;
              navigate("/chat");
            }
          catch (error) {
              console.error("Error saving Google user:", error);
              alert("Google login failed");
            }

        }}
          />
        </div>
        <p className="text-center mt-6 text-sm text-white">
          Don’t have an account?{" "}
          <Link to="/register" className="underline font-semibold">
              Register for free
          </Link>
        </p>
      </div>
    </div>
  );
}
