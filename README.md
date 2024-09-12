# 🌱 Verdant Vow

**Verdant Vow** is a platform developed as part of **Hackathon 2024**, focusing on promoting sustainability through tree care initiatives. The project aligns with the **Sustainable Development Goals (SDGs)**, particularly emphasizing **climate action** and **life on land**. Users create events, track their progress, and receive certificates, while organizations manage participants and funds.

## 🚀 Project Overview

Verdant Vow allows users to:

- **Create Events**: Define event duration and frequency, and upload progress through levels with images and descriptions.
- **Receive Certificates**: Earn certificates from renowned NGOs after completing events.

Organizations can:

- **Generate Activation Codes**: For users to join the platform and events.
- **Manage Events and Users**: Track user participation and manage funds provided by the government.
- **Manage Funds**: Organizations can maintain government-provided funds for event management.

### Key Features:

- **User Events**: Create events with a name, number of days, and frequency. Track levels and upload posts.
- **Organization Accounts**: Manage users, generate activation codes, and maintain funds.
- **Certificates**: Recognize successful event completion with certificates.

## 🌍 SDG Alignment

Verdant Vow supports the **Sustainable Development Goals**:

- **Goal 13: Climate Action** – Fighting climate change through tree care.
- **Goal 15: Life on Land** – Promoting biodiversity and reforestation.

## 🛠️ Tech Stack

### Backend:

- **Node.js**
- **Express.js**
- **Prisma ORM** (PostgreSQL)
- **JWT** for authentication
- **Joi** for validation
- **Node Cron** for scheduled tasks
- **Nodemailer** for email notifications
- **Cloudinary** for image storage
- **bcrypt** for password hashing
- **PostgreSQL** as the database

### Frontend:

- **React.js**
- **Tailwind CSS** & **Material Tailwind**
- **React Router DOM** for routing
- **Heroicons**, **FontAwesome** for icons
- **Recoil** for state management
- **React Quill** for text editing

## 🏆 Hackathon 2024

Verdant Vow was created for **Hackathon 2024**, with a focus on leveraging technology to support environmental conservation and the **Sustainable Development Goals (SDGs)**.

## 🌿 Environmental Theme

The platform is designed with an **environmental theme**, using a nature-inspired color palette, green accents, and responsive layouts to promote sustainability.

## 🏗️ Project Structure

```bash
Verdant Vow/
│
├── server/        # Backend
│   ├── prisma/    # ORM setup with PostgreSQL
│   ├── routes/    # API routes (Express.js)
│   ├── controllers/ # Route controllers
│   ├── middlewares/ # JWT security, validation (Joi)
│   ├── .env       # Environment variables (see below)
│   └── ...        # Other backend files
│
├── frontend/      # Frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Main pages (register, event creation, etc.)
│   │   ├── store/       # State management (Recoil)
|   |   ├── hooks/
│   ├── public/
│   ├── .env              # Environment file for backend URL (see below)
│   └── ...               # Other frontend files
│
└── README.md
```

## 📚 Getting Started

### Prerequisites

1. **Node.js** and **npm** installed.
2. **PostgreSQL** installed and running.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/verdant-vow.git
   cd verdant-vow
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   cd server
   npm install
   cd ../frontend
   npm install
   ```

### Backend Configuration

In the `server` directory, create a `.env` file with the following environment variables:

```env
DATABASE_URL=your_postgresql_database_url
EMAIL=your_email
EMAIL_PASSWORD=your_email_password
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Frontend Configuration

In the `frontend` directory, create a `.env` file with the following environment variable:

```env
VITE_REACT_BASE_URL="http://localhost:3000/api/v1"
```

### Running the Project

1. Run the backend:

   ```bash
   cd server
   npm run dev
   ```

2. Run the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

### Backend API Endpoints

The API includes routes for:

- **User registration and authentication** (JWT-based)
- **Event creation and level management**
- **Organization account management**
- **Activation code generation**

### Frontend Features

- **Event creation** with customizable duration and frequency.
- **Progress tracking** through levels with image uploads.
- **Organization management** of users and funds.

## 💻 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance the project.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

## 🔐 License

This project is licensed under the MIT License.
