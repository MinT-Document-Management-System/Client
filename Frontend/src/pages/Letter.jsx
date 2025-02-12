import React, { useState, useEffect } from 'react';

function Letter() {
    const [recipients, setRecipients] = useState([]);
    const [filteredRecipients, setFilteredRecipients] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [messages, setMessages] = useState([]);

    // Simulated fetch function to get recipients
    useEffect(() => {
        const fetchRecipients = async () => {
            // Replace this with your API call to fetch recipients
            const fetchedRecipients = [
                'Staff Member A',
                'Staff Member B',
                'Record Official',
                'IT Department',
            ];
            setRecipients(fetchedRecipients);
            setFilteredRecipients(fetchedRecipients);
        };

        fetchRecipients();
    }, []);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = recipients.filter(recipient => 
            recipient.toLowerCase().includes(searchTerm)
        );
        setFilteredRecipients(filtered);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (selectedRecipient.trim() && subject.trim() && body.trim()) {
            const newMessage = {
                id: messages.length + 1,
                sender: 'You',
                recipient: selectedRecipient,
                subject,
                text: body,
                time: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessage]);
            // Reset form fields
            setSelectedRecipient('');
            setSubject('');
            setBody('');
        }
    };

    return (
        <div className="flex flex-col h-screen p-5 bg-gray-100">
            <div className="flex-1 overflow-auto bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-4">Send a Letter</h2>
                <form onSubmit={handleSendMessage} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="text"
                            className="border rounded p-2 w-full"
                            placeholder="Search Recipient"
                            onChange={handleSearch}
                        />
                        <select
                            className="border rounded p-2 w-full mt-2"
                            value={selectedRecipient}
                            onChange={(e) => setSelectedRecipient(e.target.value)}
                        >
                            <option value="" disabled>Select Recipient</option>
                            {filteredRecipients.map((recipient, index) => (
                                <option key={index} value={recipient}>
                                    {recipient}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="text"
                        className="border rounded p-2"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <textarea
                        className="border rounded p-2 h-32"
                        placeholder="Message"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-500 w-32 text-white rounded p-2">
                        Send Letter
                    </button>
                </form>
            </div>
            <div className="mt-5">
                <h2 className="text-lg font-semibold mb-4">Sent Letters</h2>
                <div className="flex flex-col gap-2">
                    {messages.map((msg) => (
                        <div key={msg.id} className="border p-4 rounded-lg shadow-md">
                            <p className="font-semibold">To: {msg.recipient}</p>
                            <p className="font-semibold">Subject: {msg.subject}</p>
                            <p>{msg.text}</p>
                            <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Letter;