import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

function Letter() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Staff Member A', text: 'Can you approve my document?', time: '10:30 AM' },
        { id: 2, sender: 'Record Official', text: 'Sure, I will check it shortly.', time: '10:31 AM' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { id: messages.length + 1, sender: 'You', text: newMessage, time: new Date().toLocaleTimeString() }]);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen p-5 bg-gray-100">
            <div className="flex-1 overflow-auto bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-4">Letters</h2>
                <div className="flex flex-col gap-2">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-2 rounded-lg ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                                <p className="font-semibold">{msg.sender}</p>
                                <p>{msg.text}</p>
                                <span className="text-xs text-gray-500">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form className="flex mt-4" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="flex-1 border rounded-l-lg p-2"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white rounded-r-lg p-2 flex items-center">
                    <FaPaperPlane />
                </button>
            </form>
        </div>
    );
}

export default Letter;