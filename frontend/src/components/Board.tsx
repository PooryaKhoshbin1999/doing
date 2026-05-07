/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../services/api";
import Column from "./Column";
import Navbar from "./Navbar";
import CreateTask from "./CreateTask";

export default function Board() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = () => {
    api.get("/tasks").then((res) => setTasks(res.data));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <CreateTask onCreated={loadTasks} />

        <div className="flex gap-6">
          <Column
            title="Todo"
            tasks={tasks.filter((t: any) => t.status === "todo")}
            refresh={loadTasks}
          />
          <Column
            title="In Progress"
            tasks={tasks.filter((t: any) => t.status === "in-progress")}
            refresh={loadTasks}
          />
          <Column
            title="Done"
            tasks={tasks.filter((t: any) => t.status === "done")}
            refresh={loadTasks}
          />
        </div>
      </div>
    </div>
  );
}
