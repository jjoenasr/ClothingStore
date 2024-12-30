# Use an official Node.js image to build the React app
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React code
COPY frontend/ .

# Expose the port for the React app
EXPOSE 3000

# Run React app in development mode
CMD ["npm", "start"]
