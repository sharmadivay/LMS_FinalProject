import React, { useEffect, useState } from "react";
import TeacherNavbar from "../components/TeacherNavbar";
import TeacherSidebar from "../components/TeacherSidebar";

export default function TeacherMessages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      timestamp: "2025-05-30 10:00 AM",
      content: "Hello sir, I have a doubt in Java class.",
      sender: "student_123",
    },
    {
      id: 2,
      timestamp: "2025-05-30 12:00 PM",
      content: "Can you please review my assignment?",
      sender: "student_456",
    },
  ]);
  const [replyMessage, setReplyMessage] = useState("");

  // Replace with your backend API when ready
  // useEffect(() => {
  //   fetch(/api/messages/inbox/${teacherId})
  //     .then((res) => res.json())
  //     .then((data) => setMessages(data));
  // }, []);

  const sendReply = (id) => {
    console.log(`Reply to message ${id}: ${replyMessage}`);
    // Call backend API here
    setReplyMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TeacherNavbar />
      <div className="flex flex-1">
        <TeacherSidebar />
        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-700">📨 Messages</h1>
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white p-4 shadow-md rounded-lg">
              <span className="text-sm text-gray-400">{msg.timestamp}</span>
              <p className="text-gray-600 mt-2">{msg.content}</p>
              <p className="text-sm text-blue-600 mt-1">From: {msg.sender}</p>
              <div className="mt-3 flex gap-2">
                <input
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type a reply..."
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={() => sendReply(msg.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Reply
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}