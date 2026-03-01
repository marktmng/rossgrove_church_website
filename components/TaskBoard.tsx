"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  leading: string | null;
  speaking: string | null;
  status: string;
  dueDate: string | null;
  createdAt: string;
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [leading, setLeading] = useState("");
  const [speaking, setSpeaking] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  async function addTask() {
    if (!title.trim()) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        leading,
        speaking,
        dueDate,
      }),
    });

    const created = await res.json();
    setTasks((prev) => [created, ...prev]);

    setTitle("");
    setLeading("");
    setSpeaking("");
    setDueDate("");
  }

  async function toggleComplete(task: Task) {
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status:
          task.status === "Pending"
            ? "Completed"
            : "Pending",
      }),
    });

    const updated = await res.json();

    setTasks((prev) =>
      prev.map((t) =>
        t.id === updated.id ? updated : t
      )
    );
  }

  async function deleteTask(id: string) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks((prev) =>
      prev.filter((t) => t.id !== id)
    );
  }

  return (
    <div className="mt-10 space-y-10">

      {/* CREATE TASK */}
      <div className="bg-white p-8 shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-[#82CEC7]">
          Create Task
        </h2>

        <div className="flex flex-col gap-4 text-gray-700">

          <input
            className="border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#82CEC7] focus:outline-none"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#82CEC7] focus:outline-none"
            placeholder="Leading..."
            value={leading}
            onChange={(e) => setLeading(e.target.value)}
          />

          <input
            className="border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#82CEC7] focus:outline-none"
            placeholder="Speaking..."
            value={speaking}
            onChange={(e) => setSpeaking(e.target.value)}
          />

          <input
            type="date"
            className="border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#82CEC7] focus:outline-none"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

          <button
            onClick={addTask}
            className="bg-[#82CEC7] text-white py-3 font-medium hover:opacity-90 transition"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* TASK GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 shadow-md hover:shadow-lg transition flex flex-col gap-4"
          >
            <div>
              <h3
                className={`text-lg font-semibold text-[#82CEC7] ${
                  task.status === "Completed"
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {task.title}
              </h3>

              {task.leading && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Leading:</strong>{" "}
                  {task.leading}
                </p>
              )}

              {task.speaking && (
                <p className="text-sm text-gray-600">
                  <strong>Speaking:</strong>{" "}
                  {task.speaking}
                </p>
              )}

              {task.dueDate && (
                <div className="inline-block mt-2 bg-[#82CEC7]/10 text-[#82CEC7] text-xs font-medium px-3 py-1">
                  Due:{" "}
                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-auto">
              <button
                onClick={() =>
                  toggleComplete(task)
                }
                className="text-sm px-4 py-2 bg-[#82CEC7] text-white hover:opacity-90 transition w-full"
              >
                {task.status === "Pending"
                  ? "Complete"
                  : "Undo"}
              </button>

              <button
                onClick={() =>
                  deleteTask(task.id)
                }
                className="text-sm px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition w-full"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}