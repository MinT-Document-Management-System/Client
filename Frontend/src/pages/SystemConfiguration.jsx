import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SystemConfiguration = () => {
    const [settings, setSettings] = useState({
        maxFileSize: '',
        allowedFileTypes: '',
        emailNotifications: false,
        userRoles: [],
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleRoleChange = (e) => {
        const { value } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            userRoles: prevSettings.userRoles.includes(value)
                ? prevSettings.userRoles.filter(role => role !== value)
                : [...prevSettings.userRoles, value],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the settings to the backend
        console.log('Settings submitted:', settings);
        toast.success('System configuration updated successfully!');
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">System Configuration</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block text-lg mb-2">Max File Size (MB):</label>
                    <input
                        type="number"
                        name="maxFileSize"
                        value={settings.maxFileSize}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="Enter maximum file size"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg mb-2">Allowed File Types:</label>
                    <input
                        type="text"
                        name="allowedFileTypes"
                        value={settings.allowedFileTypes}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholder="e.g., .pdf, .docx"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={settings.emailNotifications}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        Enable Email Notifications
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-lg mb-2">User Roles:</label>
                    <div className="flex flex-col">
                        <label>
                            <input
                                type="checkbox"
                                value="Admin"
                                checked={settings.userRoles.includes('Admin')}
                                onChange={handleRoleChange}
                                className="mr-2"
                            />
                            Admin
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="User"
                                checked={settings.userRoles.includes('User')}
                                onChange={handleRoleChange}
                                className="mr-2"
                            />
                            User
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Viewer"
                                checked={settings.userRoles.includes('Viewer')}
                                onChange={handleRoleChange}
                                className="mr-2"
                            />
                            Viewer
                        </label>
                    </div>
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default SystemConfiguration;