# Stage 1: Build the application
FROM maven:3.9-amazoncorretto-17 AS builder

# Yazar bilgisi
LABEL authors="Mehmet Furkan Kaya <furkan.36kaya@gmail.com>"

# Copy the project files to the container
COPY ./pom.xml ./pom.xml

# Download all required dependencies into one layer
RUN mvn dependency:go-offline -B

# Copy your other files
COPY ./src ./src

# Build the application
RUN mvn package -DskipTests

# Stage 2: Create the runtime image
FROM amazoncorretto:17-alpine

# Set the working directory
WORKDIR /app

# Create the directory for file storage
RUN mkdir -p /app/videos

# Copy the built artifact from the builder stage
COPY --from=builder /target/*.jar /app/app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]