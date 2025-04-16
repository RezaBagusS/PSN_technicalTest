
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "primereact/card";

const StudyCasePage = () => {

    return (
        <>
            <DashboardLayout>
                <div className="p-0">
                    <Card title="Comment Management System" className="shadow-md">
                        <div className="prose max-w-full">
                            <p className="mb-4">
                                This is a Next.js application for a comment management system with user authentication, a dashboard for
                                viewing and managing comments, and a form for creating new comments. The system integrates with an external
                                API for comment data and includes features like search, delete, and input validation.
                            </p>

                            <h2 className="text-2xl font-semibold mt-6 mb-3">Features</h2>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    <strong>Login Page</strong>:
                                    <ul className="list-circle pl-6">
                                        <li>Username and password fields with required validation.</li>
                                        <li>Displays &quot;Field is required&quot; for empty fields.</li>
                                        <li>Authenticates users and redirects to the dashboard upon successful login.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Dashboard</strong>: 
                                    <ul className="list-circle pl-6">
                                        <li>Displays a table of comments fetched from an external API.</li>
                                        <li>Includes a search bar to filter comments.</li>
                                        <li>Provides a delete button for each comment to remove it from the table.</li>
                                        <li>Features a &quot;Create Comment&quot; button that navigates to the comment creation form.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Create Comment Page</strong>:
                                    <ul className="list-circle pl-6">
                                        <li>Form with fields for Name, Email, and Body.</li>
                                        <li>Validation for required fields and valid email format.</li>
                                        <li>Submits the new comment and redirects back to the dashboard table.</li>
                                    </ul>
                                </li>
                            </ul>

                            <h2 className="text-2xl font-semibold mt-6 mb-3">Tech Stack</h2>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>Framework</strong>: Next.js 15.3.0 (Pages Router)</li>
                                <li><strong>Frontend</strong>: React, TypeScript</li>
                                <li><strong>UI Components</strong>: PrimeReact (Button, InputText, DataTable, Dialog, etc.)</li>
                                <li><strong>Form Handling</strong>: react-hook-form</li>
                                <li><strong>Styling</strong>: Tailwind CSS (optional, or PrimeReact styles)</li>
                                <li><strong>API</strong>: JSONPlaceholder (for comment data, <a href="https://jsonplaceholder.typicode.com/comments" className="text-blue-600 hover:underline">https://jsonplaceholder.typicode.com/comments</a>)</li>
                                <li><strong>State Management</strong>: React Context (for global user and loading dialog)</li>
                            </ul>

                            <h2 className="text-2xl font-semibold mt-6 mb-3">License</h2>
                            <p className="mb-4">
                                MIT License. See <code>LICENSE</code> for details.
                            </p>

                            <h2 className="text-2xl font-semibold mt-6 mb-3">Contact</h2>
                            <p className="mb-4">
                                For questions or feedback, reach out to{' '}
                                <a href="https://github.com/RezaBagusS" className="text-blue-600 hover:underline">
                                    https://github.com/RezaBagusS
                                </a>{' '}
                                or open an issue on GitHub.
                            </p>
                        </div>
                    </Card>
                </div>
            </DashboardLayout>
        </>
    )

};

export default StudyCasePage;