/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../services/api";
import Column from "./Column";
import Navbar from "./Navbar";
import CreateTask from "./CreateTask";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

type Task = {
  id: number;
  title: string;
  status: "todo" | "in-progress" | "done";
};

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = () => {
    api.get("/tasks").then((res) => setTasks(res.data));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    let movedTask: any;

    setTasks((prev: Task[]) => {
      const filtered = prev.filter((t) => {
        if (t.id === taskId) {
          movedTask = t;
          return false;
        }
        return true;
      });

      const updatedTask = {
        ...movedTask,
        status: newStatus,
      };

      return [...filtered, updatedTask];
    });

    await api.patch(`/tasks/${taskId}/status`, {
      status: newStatus,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <CreateTask onCreated={loadTasks} />

        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6">
            <Column
              title="Todo"
              status="todo"
              tasks={tasks.filter((t: any) => t.status === "todo")}
              refresh={loadTasks}
            />
            <Column
              title="In Progress"
              status="in-progress"
              tasks={tasks.filter((t: any) => t.status === "in-progress")}
              refresh={loadTasks}
            />
            <Column
              title="Done"
              status="done"
              tasks={tasks.filter((t: any) => t.status === "done")}
              refresh={loadTasks}
            />
          </div>
        </DndContext>
      </div>
    </div>
  );
}
