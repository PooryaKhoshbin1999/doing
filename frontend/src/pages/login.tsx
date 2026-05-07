import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await api.post("/auth/login", {
      email,
      password,
    });

    login(res.data.access_token);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-bg flex-col">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          type="email"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        />

        <button className="w-full bg-primary text-white p-2 rounded">
          Login
        </button>
      </form>
      <div className="w-full flex justify-center items-center mt-4">
        <Link to="/register">Create account</Link>
      </div>
    </div>
  );
}
