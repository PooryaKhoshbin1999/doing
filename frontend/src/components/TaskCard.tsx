// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TaskCard({ task }: any) {
  return (
    <div className="bg-white p-3 rounded-lg shadow hover:shadow-md transition mb-2">
      {task.title}
    </div>
  );
}
