import React, { useState } from 'react';

const FAQItem = ({ question, answer, numIndex }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 ml-16">
      <div
        className="py-4 flex items-center gap-6 cursor-pointer"
        onClick={toggleAnswer}
      >
        <h3>{numIndex}.</h3>
        <h3 className="text-lg font-semibold">{question}</h3>
        <span className="text-gray-500 text-3xl">{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <p className="py-2 text-gray-700">{answer}</p>}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      id: 1,
      question: "What is a Document Management System?",
      answer: "A Document Management System (DMS) is a software application that helps organizations manage the creation, storage, and tracking of electronic documents."
    },
    {
      id: 2,
      question: "How does a DMS improve productivity?",
      answer: "A DMS streamlines document storage and retrieval processes, reducing time spent searching for documents and enhancing collaboration among users."
    },
    {
      id: 3,
      question: "What are the main features of a DMS?",
      answer: "Common features include document capture, version control, access permissions, audit trails, and integration with other software applications."
    },
    {
      id: 4,
      question: "Is it possible to access a DMS remotely?",
      answer: "Yes, most modern DMS solutions offer cloud-based access, allowing users to retrieve and manage documents from anywhere with an internet connection."
    },
    {
      id: 5,
      question: "How secure is a Document Management System?",
      answer: "A DMS typically includes security features such as encryption, user authentication, and access controls to protect sensitive information."
    },
    {
      id: 6,
      question: "Can a DMS integrate with other applications?",
      answer: "Yes, many DMS solutions offer integration capabilities with other business applications like CRM, ERP, and email systems."
    },
    {
      id: 7,
      question: "What types of documents can be managed with a DMS?",
      answer: "A DMS can manage a wide variety of document types, including PDFs, Word documents, images, spreadsheets, and emails."
    },
    {
      id: 8,
      question: "How do I migrate existing documents to a DMS?",
      answer: "Migration typically involves scanning physical documents, importing existing digital files, and organizing them within the DMS structure."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions about Document Management Systems</h2>
      {faqData.map((item, index) => (
        <FAQItem
          key={index}
          numIndex = {item.id}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

export default FAQ;