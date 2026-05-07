/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import api from "../services/api";

export default function CreateTask({ onCreated }: any) {
  const [title, setTitle] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await api.post("/tasks", { title });

    setTitle("");

    onCreated(res.data);
  };

  return (
    <form onSubmit={submit} className="flex gap-2 mb-4">
      <input
        type="text"
        className="border p-2 flex-1"
        placeholder="New task ..."
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <button className="bg-green-500 text-white px-4 rounded">Add</button>
    </form>
  );
}
