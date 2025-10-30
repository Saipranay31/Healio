
# Healio: Empowering Mental Well-Being

**Healio** is a comprehensive mental health platform designed to promote emotional resilience, self-reflection, and connection. Whether it's tracking your daily moods, setting meaningful goals, or anonymously chatting with others who understand you, Healio offers a safe space for personal growth.

## 🌟 Mission Statement

Healio's mission is to make mental health tools accessible, approachable, and impactful. We aim to create an inclusive platform where users can better understand their emotions, connect with like-minded individuals, and take actionable steps toward improving their mental health.

---

## 🌈 Why Healio?

In today’s fast-paced world, mental health often takes a backseat. Healio bridges this gap by providing:
- **Accessible Tools**: Easy-to-use features for tracking emotions, habits, and goals.
- **Community Support**: A safe and anonymous environment for discussions.
- **AI-Powered Assistance**: Personalized support and resources based on user needs.
- **Empowerment Through Data**: Insights that help users take charge of their mental well-being.

---

## 🚀 Key Features

### 1. **Home**
A personalized dashboard that serves as the central hub, offering quick access to Healio's features, insights, and recommendations.

---

### 2. **Daily Check-In**
- Reflect on your emotions each day through guided prompts.
- Gain awareness of your mental health trends.
- Receive encouragement or tips based on your entries.

---

### 3. **Gratitude Journal**
- Cultivate positivity by recording moments of gratitude daily.
- Build a habit of focusing on the bright side of life.
- Revisit past entries to relive positive memories.

---

### 4. **Healio AI**
- An intelligent virtual assistant designed to support mental well-being.
- Users can ask mental health-related questions and receive actionable advice, motivation, or tips.
- Powered by GPT to provide empathetic and helpful responses.

---

### 5. **Activities**
- Engage in meaningful tasks like mindfulness exercises, journaling prompts, or creative outlets.
- Suggestions tailored to improve mood and reduce stress.

---

### 6. **Story Generator**
- Uplifting and motivational stories generated on demand.
- Perfect for when users need a quick boost of inspiration.

---

### 7. **Community Forum**
- Share your experiences and thoughts with a supportive community.
- Participate in moderated discussions on topics like mental health, personal growth, and more.
- Post anonymously for added comfort.

---

### 8. **Goal Tracking**
- Set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals.
- Track your progress and celebrate achievements.
- Receive reminders and encouragement to stay on track.

---

### 9. **Anonymous Chats**
- Create or join anonymous chatrooms based on topics of interest.
- Set participant limits for smaller, intimate conversations.
- Communicate freely without fear of judgment.

---

## Tech Stack

### Frontend
- **Framework**: Next.js
- **UI**: Tailwind CSS + `shadcn/ui`

### Backend
- **Framework**: Node.js, Express.js
- **Database**: 
  - Firestore (NoSQL database for structured user data)
  - Firebase Realtime Database (for anonymous chatrooms and live updates)
  - MongoDB (for activities, goals, and other datasets)
- **Authentication**: Firebase Authentication

---

## Installation

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- A Firebase project set up with Firestore, Realtime Database, and Firebase Authentication.

---

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Sathwik9418/healio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd healio
   ```

3. Install dependencies for both the frontend and backend:
   ```bash
   npm install
   ```

4. Set up a `.env.local` file in the root directory with the following **sample values**:

   ```env
   # Server Configuration
   PORT=5000

   # Firebase Config
   NEXT_PUBLIC_API_KEY=YOUR_FIREBASE_API_KEY
   NEXT_PUBLIC_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_APP_ID=YOUR_FIREBASE_APP_ID
   NEXT_PUBLIC_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=YOUR_FIREBASE_REALTIME_DATABASE_URL

   # GEMINI API KEY 
   GEMINI_API_KEY=SAMPLE_API_KEY
   ```

5. Start MongoDB locally or connect to your MongoDB Atlas database.

6. Start the backend server:
   ```bash
   npm run server
   ```

7. Start the development server for the frontend:
   ```bash
   npm run dev
   ```

   The frontend will be accessible at [http://localhost:3000](http://localhost:3000), and the backend server will run on [http://localhost:5000](http://localhost:5000).

---

## Usage

- **Frontend**: Access features such as mood tracking, Healio AI, anonymous chats, and more.
- **Backend**: Manage user data, goals, mood entries, and anonymous chatrooms.

---

## 🌎 Who is Healio For?

- **Individuals seeking to track their mental health journey**: Gain better clarity into patterns and emotions.
- **Those in search of support or inspiration**: Healio’s community and features are designed to uplift and encourage.
- **People curious about self-improvement tools**: Explore new ways to boost positivity and productivity.

---

## 🌱 Future Roadmap

We aim to continuously improve Healio with the following planned features:
- **Gamification Elements**: Reward users for consistent journaling and mood tracking.
- **Offline Mode**: Allow users to log their data even without internet access.
- **AI Recommendations**: Provide activity and content suggestions based on user data and preferences.
- **Multi-Language Support**: Expand Healio’s accessibility to non-English speaking users.
- **Mobile App**: Launch dedicated iOS and Android apps for seamless access.

---


## Contribution

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---
