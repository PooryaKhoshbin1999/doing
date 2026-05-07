/* eslint-disable @typescript-eslint/no-explicit-any */
import TaskCard from "./TaskCard";

export default function Column({ title, tasks, refresh }: any) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl w-80">
      <h2 className="font-bold mb-4">{title}</h2>

      {tasks.map((t: any) => (
        <TaskCard key={t.id} task={t} refresh={refresh} />
      ))}
    </div>
  );
}
