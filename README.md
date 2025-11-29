ShareHub - Cloud Storage Platform
A full-stack cloud storage application similar to OneDrive, built with Spring Boot and React.

Features
User Authentication: Secure registration and login with JWT tokens
File Management: Upload, download, delete, and organize files
Folder Structure: Create and manage folders for better organization
File Sharing: Share files with other users
Favorites: Mark important files and folders as favorites
Trash/Recycle Bin: Soft delete with restore functionality
Storage Management: Track storage usage with 10GB default limit per user
Responsive UI: Modern, clean interface built with React and Tailwind CSS
Dark/Light Theme: Theme switching support
Tech Stack
Backend
Java 17
Spring Boot 3.2.0
Spring Security with JWT authentication
Spring Data JPA with Hibernate
MySQL database (with H2 support for development)
Maven for dependency management
Lombok for reducing boilerplate code
Frontend
React 18
Vite for fast development and building
React Router for navigation
Axios for API calls
Tailwind CSS for styling
Lucide React for icons
date-fns for date formatting
Prerequisites
Java 17 or higher
Node.js 18 or higher
MySQL 8.0 or higher (or use H2 for development)
Maven 3.6 or higher
Installation & Setup
1. Clone the Repository
git clone <repository-url>
cd onedrive-clone
2. Database Setup
Option A: MySQL (Production)
Install and start MySQL
Create a database:
CREATE DATABASE sharehub_db;
Update credentials in backend/src/main/resources/application.yml:
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/sharehub_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
    username: your_mysql_username
    password: your_mysql_password
Option B: H2 (Development)
Change the active profile in backend/src/main/resources/application.yml:

spring:
  profiles:
    active: h2
3. Backend Setup
cd backend

# Install dependencies and compile
mvn clean install

# Run the application
mvn spring-boot:run
The backend will start on http://localhost:4000

4. Frontend Setup
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
The frontend will start on http://localhost:3001 (or 3000 if available)

Configuration
Backend Configuration
Key configuration files:

application.yml - Main configuration (MySQL)
application-h2.yml - H2 database configuration
Important settings:

server:
  port: 4000

app:
  jwt:
    secret: your-secret-key
    expiration-ms: 86400000  # 24 hours
  storage:
    location: ${user.home}/sharehub-storage
    max-file-size: 10737418240  # 10GB
Frontend Configuration
Update vite.config.js if backend port changes:

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    }
  }
})
API Endpoints
Authentication
POST /api/auth/register - Register new user
POST /api/auth/login - Login user
Files
GET /api/files - Get all files
GET /api/files/{id} - Get file by ID
POST /api/files/upload - Upload file
GET /api/files/{id}/download - Download file
DELETE /api/files/{id} - Delete file
PUT /api/files/{id}/favorite - Toggle favorite
PUT /api/files/{id}/restore - Restore from trash
Folders
GET /api/folders - Get all folders
POST /api/folders - Create folder
DELETE /api/folders/{id} - Delete folder
Sharing
POST /api/share - Share file/folder
GET /api/share/shared-with-me - Get shared items
User
GET /api/users/me - Get current user profile
PUT /api/users/me - Update user profile
Project Structure
onedrive-clone/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/sharehub/
│   │   │   │   ├── config/          # Security & app configuration
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── dto/             # Data transfer objects
│   │   │   │   ├── exception/       # Exception handlers
│   │   │   │   ├── model/           # JPA entities
│   │   │   │   ├── repository/      # Data repositories
│   │   │   │   ├── security/        # JWT & security
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── application-h2.yml
│   │   └── test/
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── api/              # API service layer
    │   ├── components/       # React components
    │   ├── context/          # React context (Auth, Theme)
    │   ├── pages/            # Page components
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
Usage
Access the Application: Open http://localhost:3001 in your browser

Register: Create a new account with email and password

Login: Sign in with your credentials

Upload Files: Click the upload button to add files

Create Folders: Organize your files in folders

Share Files: Share files with other users by email

Manage Storage: View your storage usage in the dashboard

Default User Storage
Each user gets 10GB of storage by default
Storage limit can be modified in the database or application configuration
File Storage Location
Files are stored locally at:

Windows: C:\Users\<username>\sharehub-storage
Linux/Mac: /home/<username>/sharehub-storage
Security
Passwords are encrypted using BCrypt
JWT tokens for stateless authentication
CORS configured for frontend-backend communication
File access controlled by user ownership
SQL injection prevention through JPA
Development
Build for Production
Backend:

cd backend
mvn clean package
java -jar target/sharehub-backend-0.0.1-SNAPSHOT.jar
Frontend:

cd frontend
npm run build
# Serve the dist folder with any static server
Running Tests
Backend:

cd backend
mvn test
Frontend:

cd frontend
npm run test
Troubleshooting
Port Already in Use
If port 4000 or 3001 is in use, change the port in configuration files.

CORS Issues
Ensure the frontend URL is added to CORS allowed origins in SecurityConfig.java:

configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:3001"));
Database Connection Failed
Verify MySQL is running
Check database credentials in application.yml
Ensure database exists or createDatabaseIfNotExist=true is set
File Upload Issues
Check storage location permissions
Verify max-file-size configuration
Ensure sufficient disk space
License
This project is open source and available under the MIT License.

Contributing
Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Create a Pull Request
Support
For issues and questions, please create an issue in the repository.


why there are application.yml and application-h2.yml instead of application.properties?

YAML vs Properties
1. Better Readability & Structure
YAML (application.yml):

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/sharehub_db
    username: root
    password: password
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
Properties (application.properties):

spring.datasource.url=jdbc:mysql://localhost:3306/sharehub_db
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
YAML is more hierarchical and easier to read, especially for complex configurations.

2. Less Repetition
YAML uses indentation to show hierarchy, so you don't repeat prefixes like spring.datasource. for every property.

3. Profile-Specific Configuration
The project has two configurations:

application.yml - Main configuration (uses MySQL, active profile: default)
application-h2.yml - H2 database configuration (for development/testing)
When you set spring.profiles.active: h2, Spring Boot automatically loads application-h2.yml in addition to application.yml, and the H2 settings override the MySQL settings.

4. Modern Spring Boot Standard
While both formats work, YAML has become the preferred format in modern Spring Boot applications because:

Better for complex configurations
Easier to maintain
More readable for teams
Supports lists and maps more naturally
5. Multiple Profiles in One File
YAML also allows multiple profiles in a single file using --- separator:

spring:
  application:
    name: sharehub-backend

---
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:h2:mem:testdb

---
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: jdbc:mysql://localhost:3306/prod_db
You Can Still Use Properties!
If you prefer .properties files, Spring Boot supports both. You can convert the YAML files to properties format and it will work exactly the same way. Both formats are valid and Spring Boot will automatically detect and use whichever format you have.

The choice is mostly about preference and team standards - YAML is just more popular in modern Spring Boot projects.
