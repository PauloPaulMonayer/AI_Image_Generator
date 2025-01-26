# AI Image Generator

### **Dynamic Image Creation Powered by Artificial Intelligence**

---

## **Project Overview**

The **AI Image Generator** is a full-stack web application that allows users to create high-quality images dynamically based on textual descriptions. It integrates advanced artificial intelligence capabilities, including OpenAI's API, and features a robust user management system with options for email-password login and Google OAuth.

---

## **Features**

### **Key Functionalities**
- **Text-to-Image Generation**: Convert descriptive prompts into stunning visuals in real-time.
- **Flexible Image Sizes**: Choose between Small (256x256), Medium (512x512), and Large (1024x1024).
- **User Management**:
  - Secure registration and login with email and password.
  - Google OAuth integration for quick and seamless access.
- **Real-Time Previews**: See results immediately as you input descriptions.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.

### **Future Enhancements**
- User galleries for saving and organizing generated images.
- Batch image generation for increased productivity.
- Advanced AI customization for greater control over output.
- Two-factor authentication for added security.

---

## **How It Works**

1. **User Registration/Login**:
   - New users can sign up with an email and password or log in using their Google account.
   - Secure authentication is managed through Passport.js and MongoDB.

2. **Image Generation**:
   - Users enter descriptive text and select the desired image size.
   - The application interacts with OpenAI’s API to generate and display images based on the input.

3. **Responsive User Interface**:
   - The interface is designed with simplicity and accessibility in mind, providing a cohesive experience across all devices.

---

## **Technologies Used**

### **Frontend**
- **HTML, CSS, JavaScript**: Dynamic, responsive UI/UX.
- **Bootstrap**: Ensures mobile-first design.

### **Backend**
- **Node.js & Express.js**: Backend framework for API handling.
- **Passport.js**: Secure user authentication, including Google OAuth.

### **Database**
- **MongoDB**: Stores user data and image metadata.

### **AI Integration**
- **AI API**: Generates images dynamically based on user inputs.

---

## **Installation Instructions**

### **Requirements**
- **Node.js** (v16 or higher)
- **MongoDB**

### **Setup Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/AI-Image-Generator.git
   ```

2. Navigate to the project directory:
   ```bash
   cd AI-Image-Generator
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     OPENAI_API_KEY=your_openai_api_key
     MONGO_URI=your_mongo_db_connection_string
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     SESSION_SECRET=your_session_secret
     ```

5. Start the application:
   ```bash
   npm start
   ```

6. Open your browser and visit:
   ```
   http://localhost:5000
   ```

---

## **Project Structure**

```
AI-Image-Generator/
├── public/
│   ├── images/
│   ├── css/
│   └── js/
├── routes/
├── controllers/
├── models/
├── config/
├── views/
├── index.js
└── package.json
```

- **`public/`**: Static assets like CSS, JavaScript, and images.
- **`routes/`**: API and application routes.
- **`controllers/`**: Business logic for API endpoints.
- **`models/`**: Mongoose schemas for managing MongoDB collections.
- **`config/`**: Configuration for Passport.js and other modules.

---

## **Contribution Guidelines**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on GitHub.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Contact**

For inquiries or support, reach out to:
- **Email**: [monayer42@gmail.com](mailto:monayer42@gmail.com)
- **LinkedIn**: [Paulo Monayer](https://www.linkedin.com/in/paulo-monayer/)
- **GitHub**: [PauloPaulMonayer](https://github.com/PauloPaulMonayer)

---

Thank you for checking out the **AI Image Generator** project!

