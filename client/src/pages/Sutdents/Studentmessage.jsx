import React, { useState } from 'react';
import StudentSidebar from '../../components/Student/StudentSidebar';
import StudentNavbar from '../../components/Student/StudentNavbar';
import Footer from '../../components/Footer';

export default function StudentMessages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Prof. Sharma",
      subject: "Assignment Reminder",
      content: "Please submit by tonight.",
      timestamp: "2025-05-30 9:00 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    console.log("Message sent:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 space-y-5">
          <h1 className="text-2xl font-bold">📨 Messages from Teachers</h1>
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white shadow p-4 rounded-lg">
              <div className="flex justify-between">
                <h2 className="font-bold text-lg">{msg.subject}</h2>
                <span className="text-gray-500 text-sm">{msg.timestamp}</span>
              </div>
              <p className="text-gray-700 mt-2">{msg.content}</p>
              <p className="text-sm text-green-600 mt-1">From: {msg.sender}</p>
            </div>
          ))}
          <div className="mt-5">
            <h3 className="text-lg font-semibold">✉ Send a Message</h3>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full border rounded p-2 mt-2"
              rows="3"
              placeholder="Write your message..."
            />
            <button
              onClick={handleSendMessage}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Send Message
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}