FROM node as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# ci here means clean install, not continuous integration
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]