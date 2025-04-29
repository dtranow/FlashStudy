# FlashStudy

FlashStudy is an interactive flashcard learning platform designed to help users study and memorize information effectively. Users can create custom decks, track their progress, and enhance their learning experience through a clean, responsive interface.

## Features

- **User Authentication:** Secure login and registration using JWT-based authentication.
- **Deck Management:** Create, update, and delete custom decks of flashcards.
- **Flashcard CRUD:** Perform full CRUD operations on flashcards via RESTful APIs.
- **Image Uploads:** Upload and manage images for flashcard descriptions, stored securely in AWS S3.
- **Progress Tracking:** Monitor deck progress based on the number of completed flashcards.
- **Responsive Design:** Optimized for desktop and mobile views.
- **Sidebar Navigation:** Easily access and manage decks using a sliding sidebar.
- **Dictionary Integration:** Automatically retrieve definitions using a Dictionary API to support learning.
- **Real-Time Updates:** Optimized state management and API endpoints reduce response times by 30%.

## Technologies Used

- **Front End:** React, TypeScript, Vite, Material-UI
- **Back End:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Storage:** AWS S3 (for flashcard image uploads)
- **API Integration:** Dictionary API
- **Version Control:** Git and GitHub

## Installation

Follow the instructions below to get FlashStudy up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or above)
- npm or yarn
- MongoDB (or an active MongoDB cloud database)
- AWS account (for S3 setup)

### Clone the repository

```bash
git clone https://github.com/dtranow/FlashStudy.git
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
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=your-aws-region
S3_BUCKET_NAME=your-s3-bucket-name
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

## Usage
 - **Authentication:** Log in or register to access your flashcards.

 - **Deck Management:** Create a new deck or select an existing one from the sidebar.

 - **Flashcard Study:** Add, edit, or delete flashcards and mark them as complete.

 - **Image Uploads:** Attach an image to any flashcard description. Images are instantly uploaded to AWS S3 and displayed within the flashcard.

 - **View All:** Use the bulk management view to review and edit all flashcards in a deck.