import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/auth/register", {
      email,
      password,
    });

    alert("Account created, Now Login");
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow w-80">
        <h1 className="text-xl font-bold mb-4">Register</h1>

        <input
          type="email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-500 text-white w-full p-2 rounded">
          Register
        </button>
      </form>
      <div className="w-full flex justify-center items-center mt-4">
        <Link to="/login">already have account</Link>
      </div>
    </div>
  );
}
