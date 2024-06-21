FROM node:18

# Create and set the working directory.
WORKDIR /app

# Copy over both package and package-lock files.
COPY package*.json ./

# Install TypeScript globally.
RUN npm install -g typescript

# Install the dependencies.
RUN npm install

# Copy over the rest of the files.
COPY . .

# Build the app.
RUN npm run build

# Install PostgreSQL and utilities
RUN apt-get update \
    && apt-get install -y postgresql postgresql-client \
    && service postgresql start \
    && su postgres -c "psql -c \"CREATE USER database WITH SUPERUSER PASSWORD 'database';\"" \
    && su postgres -c "createdb -O database database"

# Environment variable for DATABASE_URL
ENV DATABASE_URL="postgres://database:database@localhost:5432/database"

# Run the app.
CMD [ "npm", "start" ]
