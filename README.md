# 🌍 Travel Diary App

A full-stack Travel Diary web application where users can sign up, log in, and save their travel memories with images, dates, locations, and personal experiences. Users can also update or delete their travel entries.

## 🛠 Tech Stack

- **Frontend:** ReactJS, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Deployment:**
  - Frontend: [Vercel-Frontend](https://travel-diary-frontend-six.vercel.app/#/)
  - Backend: [Vercel-Backend](https://travel-diary-henna.vercel.app/)
  - Database: MongoDB Atlas

---

## 🔐 Features

- ✅ User Authentication (Login, Signup, Logout)
- 🖼️ Upload travel pictures
- 🗓️ Add travel date and multiple locations
- ✍️ Share travel experiences
- ♻️ Update and Delete entries
- 📅 Filter memories by **date range**
- 🔍 Search memories by **text** (e.g., location, experience)
-  💖 Mark memories as **wishlist** (favorites)
- ❤️ View and manage **wishlist** memories at the top
- 📦 REST API integration between frontend and backend
- 🔐 JWT-based authentication with protected routes

---
## ⚙️ How It Works

### 👤 1. User Authentication
- Users sign up or log in using their email and password.
- After successful login, a **JWT token** is stored to authenticate further requests.
- Protected routes and memory actions require the user to be logged in.

### 📸 2. Add a Travel Memory
- Users can give a title, upload a photo, select a travel date, enter multiple locations, and write their experience.
- The image is uploaded to **Cloudinary** and the URL is saved.
- The complete memory object is then saved to **MongoDB** via a backend API.

### 📖 3. View and Manage Entries
- All saved travel memories are fetched and displayed to the user after login.
- Each memory card shows image, date, locations, and experience.
- Users can:
  - 🖊️ **Edit**: Update memory details and image
  - ❌ **Delete**: Remove a memory permanently
  - 💖 **Wishlist**: Mark/unmark as favorite

### 🔍 4. Filter and Search
- Users can:
  - 📅 Filter memories by a **date range**
  - 🔍 Search memories by **text keywords** (e.g., place names, descriptions)

### ❤️ 5. Wishlist
- Memories can be marked as wishlist items.
- A dedicated view/filter allows users to see only their wishlist entries.

### 🔐 6. Security
- All API requests are authenticated using JWT tokens.
- Unauthorized users cannot access or modify other users' data.

---

## 🚀 Live Demo

🌐 [Visit the Live App](https://travel-diary-frontend-six.vercel.app/#/login)

---
## ⚙️ Setup & Installation

Follow the steps below to run the project locally with secure HTTPS-aware configuration.

---

### 📁 1. Clone the Repository

```bash
git clone https://github.com/Coder-Pratyasha/Travel-diary.git
cd Travel-diary

```

### 📁 2. Install dependencies

Backend
```bash
cd .\backend
npm install

```
Frontend
```bash
cd .\frontend
npm install

```
### 📁 3. Start the server
Frontend

```bash
cd .\frontend
npm run dev
```
Backend
```bash
cd .\backend
npm run dev
```
---
---

## 📈 Future Enhancements

Here are some features planned for future updates:

- 🗺️ **Map Integration**  
  Display visited locations on an interactive map using Google Maps or Leaflet.

- 🧭 **Location Auto-Suggestions**  
  Add autocomplete for location input using a Geolocation API.

- 📥 **Download Memories as PDF**  
  Allow users to export individual or all travel entries as downloadable PDFs.

- 🌐 **Public Sharing of Memories**  
  Enable users to share selected travel memories via public links.

- 🔔 **Reminders/Notifications**  
  Notify users of travel anniversaries using browser notifications.


- 🌍 **Multi-language Support**  
  Add language options for a global audience.



