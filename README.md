# FlashStudy

FlashStudy is an interactive flashcard app designed to help users study and memorize information effectively. It provides users with the ability to create custom decks, track progress, and enhance learning with an intuitive interface.

## Features

- **User Authentication**: Secure login and registration for users to manage their decks and progress.
- **Deck Management**: Create, update, and delete custom decks of flashcards.
- **Progress Tracking**: Visualize deck progress based on completed flashcards.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Sidebar Navigation**: Access and manage decks easily with a sliding sidebar.
- **Logout Functionality**: Securely log out of the app.

## Installation

Follow the instructions below to get FlashStudy up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or above)
- npm or yarn
- MongoDB (or an active MongoDB cloud database)

### Clone the repository

```bash
git clone https://github.com/your-username/FlashStudy.git
cd FlashStudy
```

### Install dependencies
Run the following command to install the required packages:
```bash

npm install
```
### Setup environment variables
Create a .env file at the root of the project and add the following environment variables:
```ini
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PORT=5000
```
Replace your-mongodb-uri with your actual MongoDB connection URI and your-jwt-secret with a secure secret for your JWT tokens.

### Run the app
To run both the client and server in development mode:
1. In the backend directory, run:
```bash

npm run dev
```
2. In the frontend directory, run:
```bash
npm start
```
