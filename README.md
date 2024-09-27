# Next.js Authentication Practice

This repository contains a practice project for implementing authentication in a Next.js application. The project demonstrates how to handle user registration, login, password reset, and email verification using Next.js, MongoDB, and various authentication techniques.

## Features

- User Registration
- User Login
- Password Reset
- Email Verification
- Protected Routes
- JWT Authentication
- Responsive Design

## Technologies Used

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hot Toast](https://react-hot-toast.com/)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nextjs-auth-practice.git
   cd nextjs-auth-practice
   ```

2. Install dependencies:
   npm install

### or using Yarn

yarn install

### or using PNPM

pnpm install

1. Create a .env.local file in the root directory and add your environment variables:
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

Running the Development Server
npm run dev

### or

yarn dev

### or pnpm dev

pnpm dev

### or bun dev

bun dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
.
├── components
│ ├── AuthForm.tsx
│ └── Navbar.tsx
├── models
│ └── userModel.ts
├── pages
│ ├── api
│ │ ├── users
│ │ │ ├── login.ts
│ │ │ ├── register.ts
│ │ │ ├── resetpassword.ts
│ │ │ └── verifyemail.ts
│ ├── profile.tsx
│ ├── login.tsx
│ ├── register.tsx
│ ├── resetpassword.tsx
│ └── verifyemail.tsx
├── public
│ └── favicon.ico
├── styles
│ └── globals.css
├── utils
│ └── auth.ts
├── .env.local
├── next.config.js
├── package.json
└── README.md
