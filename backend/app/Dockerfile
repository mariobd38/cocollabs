# Use an official OpenJDK runtime as a parent image
#FROM openjdk:24
FROM eclipse-temurin:23

# Set the working directory inside the container
WORKDIR /app

# Copy the backend's JAR file into the container at /app
COPY target/app-0.0.1-SNAPSHOT.jar /app/backend.jar

# Expose the port the Spring Boot app runs on
EXPOSE 8080

# Allow setting active profiles via environment variable
ENV SPRING_PROFILES_ACTIVE=dev
ENTRYPOINT ["java", "-jar", "/app/backend.jar"]
