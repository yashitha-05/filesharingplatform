# ShareHub - Backend

A full-featured cloud storage backend built with Spring Boot, providing file management, folder organization, sharing capabilities, and user authentication.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **File Management**: Upload, download, delete, restore, and favorite files
- **Folder Organization**: Create, update, delete folders with hierarchical structure
- **File Sharing**: Share files and folders with other users or via public links
- **Storage Management**: Track storage usage with configurable limits
- **Trash Management**: Soft delete files with restore capability
- **Search**: Search files and folders by name
- **Security**: Spring Security with JWT tokens

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA** with Hibernate
- **MySQL** database
- **Flyway** for database migrations
- **Lombok** for reducing boilerplate
- **Maven** for dependency management

## Prerequisites

- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## Configuration

Update `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/sharehub_db?createDatabaseIfNotExist=true
    username: root
    password: your_password
    
app:
  jwt:
    secret: your-256-bit-secret-key-here
    expiration-ms: 86400000 # 24 hours
  storage:
    location: ${user.home}/sharehub-storage
    max-file-size: 10737418240 # 10GB
```

## Running the Application

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Configure MySQL**
   - Ensure MySQL is running
   - Update database credentials in `application.yml`

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Files
- `POST /api/files` - Upload file
- `GET /api/files` - Get files (with optional folderId)
- `GET /api/files/{id}` - Get file details
- `GET /api/files/{id}/download` - Download file
- `DELETE /api/files/{id}` - Move file to trash
- `DELETE /api/files/{id}/permanent` - Permanently delete file
- `POST /api/files/{id}/restore` - Restore file from trash
- `POST /api/files/{id}/favorite` - Toggle favorite status
- `GET /api/files/trash` - Get trashed files
- `GET /api/files/favorites` - Get favorite files
- `GET /api/files/search?query={query}` - Search files

### Folders
- `POST /api/folders` - Create folder
- `GET /api/folders` - Get folders (with optional parentId)
- `GET /api/folders/{id}` - Get folder details
- `PUT /api/folders/{id}` - Update folder
- `DELETE /api/folders/{id}` - Delete folder
- `GET /api/folders/search?query={query}` - Search folders

### Sharing
- `POST /api/share` - Create share
- `GET /api/share/by-me` - Get shares created by user
- `GET /api/share/with-me` - Get shares received by user
- `GET /api/share/public/{shareLink}` - Get public share
- `DELETE /api/share/{id}` - Delete share

## Database Schema

The application uses Flyway for database migrations. The schema includes:

- **users** - User accounts with storage tracking
- **folders** - Hierarchical folder structure
- **files** - File metadata with trash and favorite support
- **shares** - File and folder sharing with permissions

## Security

- JWT-based authentication
- Password encryption using BCrypt
- CORS configuration for frontend integration
- Stateless session management

## Storage

Files are stored on the local filesystem in the configured storage location. Each user has their own directory, and files are stored with UUID-based names to prevent conflicts.

## Development

### Project Structure
```
src/main/java/com/sharehub/
├── config/          # Configuration classes
├── controller/      # REST controllers
├── dto/            # Data Transfer Objects
├── exception/      # Custom exceptions and handlers
├── model/          # JPA entities
├── repository/     # Spring Data repositories
├── security/       # Security configuration and JWT
└── service/        # Business logic
```

### Building for Production

```bash
mvn clean package -DskipTests
java -jar target/sharehub-backend-0.0.1-SNAPSHOT.jar
```

## License

MIT License
