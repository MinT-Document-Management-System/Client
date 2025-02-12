import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function Approvals() {
    const [documents, setDocuments] = useState([]);

    // Simulated function to fetch documents
    useEffect(() => {
        const fetchDocuments = async () => {
            // Replace with your API call to fetch documents
            const fetchedDocuments = [
                { id: 1, title: 'Project Proposal', submittedBy: 'Staff Member A', submissionDate: '2025-01-31', description: 'Proposal for the new project.' },
                { id: 2, title: 'Budget Report', submittedBy: 'Staff Member B', submissionDate: '2025-01-30', description: 'Detailed budget report.' },
            ];
            setDocuments(fetchedDocuments);
        };

        fetchDocuments();
    }, []);

    const handleApproval = (id) => {
        // Logic to approve the document
        console.log('Approved document with id:', id);
    };

    const handleDenial = (id) => {
        // Logic to deny the document
        console.log('Denied document with id:', id);
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold text-center">Document Approval</h1>
            {documents.map(doc => (
                <div key={doc.id} className="border p-4 rounded my-4 shadow-md">
                    <h3 className="font-semibold text-lg">{doc.title}</h3>
                    <p><strong>Submitted by:</strong> {doc.submittedBy}</p>
                    <p><strong>Submission Date:</strong> {doc.submissionDate}</p>
                    <p><strong>Description:</strong> {doc.description}</p>
                    <div className="flex justify-end mt-4">
                        <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600" onClick={() => handleApproval(doc.id)}>
                            <FaCheckCircle /> Approve
                        </button>
                        <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => handleDenial(doc.id)}>
                            <FaTimesCircle /> Deny
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Approvals;