"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Message sent (frontend only)");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        onChange={handleChange}
        className="w-full border p-3 rounded h-32"
        required
      />
      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
      >
        Send Message
      </button>
    </form>
  );
}