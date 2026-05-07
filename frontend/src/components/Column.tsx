/* eslint-disable @typescript-eslint/no-explicit-any */
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

export default function Column({ title, tasks, refresh, status }: any) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="bg-gray-100 p-4 rounded-xl w-80" ref={setNodeRef}>
      <h2 className="font-bold mb-4">{title}</h2>

      {tasks.map((t: any) => (
        <TaskCard key={t.id} task={t} refresh={refresh} />
      ))}
    </div>
  );
}
