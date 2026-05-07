/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../services/api";
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

const order = ["todo", "in-progress", "done"];

export default function TaskCard({ task, refresh }: any) {
  const [open, setOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      task,
    },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const moveNext = async () => {
    const index = order.indexOf(task.status);
    if (index === order.length - 1) return;

    const newStatus = order[index + 1];

    await api.patch(`/tasks/${task.id}/status`, {
      status: newStatus,
    });
    refresh();
  };

  const movePrev = async () => {
    const index = order.indexOf(task.status);
    if (index === 0) return;

    const newStatus = order[index - 1];

    await api.patch(`/tasks/${task.id}/status`, {
      status: newStatus,
    });

    refresh();
  };

  const remove = async () => {
    await api.delete(`/tasks/${task.id}`);
    refresh();
  };

  const edit = async () => {
    try {
      const newTitle = prompt("New title:", task.title);

      if (!newTitle) return;

      await api.patch(`/tasks/${task.id}`, {
        title: newTitle,
      });

      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="bg-white p-3 rounded-lg shadow mb-2 relative cursor-pointer"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div {...listeners}>{task.title}</div>
      <button
        className="absolute top-2 right-2 text-gray-500 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        ...
      </button>

      {open && (
        <div className="absolute right-2 top-8 bg-white shadow rounded w-40 z-10">
          <button
            onClick={moveNext}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Move Next
          </button>

          <button
            onClick={movePrev}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Move prev
          </button>

          <button
            onClick={edit}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={remove}
            className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
