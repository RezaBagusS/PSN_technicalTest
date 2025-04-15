
# Comment Management System

This is a Next.js application for a comment management system with user authentication, a dashboard for viewing and managing comments, and a form for creating new comments. The system integrates with an external API for comment data and includes features like search, delete, and input validation.

## Features

- **Login Page**:
  - Username and password fields with required validation.
  - Displays "Field is required" for empty fields.
  - Authenticates users and redirects to the dashboard upon successful login.
- **Dashboard**:
  - Displays a table of comments fetched from an external API.
  - Includes a search bar to filter comments.
  - Provides a delete button for each comment to remove it from the table.
  - Features a "Create Comment" button that navigates to the comment creation form.
- **Create Comment Page**:
  - Form with fields for Name, Email, and Body.
  - Validation for required fields and valid email format.
  - Submits the new comment and redirects back to the dashboard table.
- **Global Toast Notifications**:
  - Displays success, error, or info messages for actions like login, comment creation, and deletion.

## Tech Stack

- **Framework**: Next.js 15.3.0 (App Router)
- **Frontend**: React, TypeScript
- **UI Components**: PrimeReact (Button, InputText, DataTable, Toast, etc.)
- **Form Handling**: react-hook-form
- **Styling**: Tailwind CSS (optional, or PrimeReact styles)
- **API**: JSONPlaceholder (for comment data, https://jsonplaceholder.typicode.com/comments)
- **State Management**: React Context (for global toast notifications)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A modern browser (Chrome, Firefox, etc.)

## License

MIT License. See `LICENSE` for details.

## Contact

For questions or feedback, reach out to [rezabagussaputrait@gmail.com] or open an issue on GitHub.
