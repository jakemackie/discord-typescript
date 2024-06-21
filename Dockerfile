FROM node:18

# Create and set the working directory.
WORKDIR /app

# Copy over both package and package-lock files.
COPY package*.json ./

# Install Typescript globally.
RUN npm install -g typescript

# Install the dependencies.
RUN npm install

# Copy over the rest of the files.
COPY . .

# Build the app.
RUN npm run build

# Run the app.
CMD [ "npm", "start" ]