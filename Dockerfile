FROM node:8
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

#docker build -t basic-app .

#docker tag basic-app:latest 685279936327.dkr.ecr.ap-south-1.amazonaws.com/basic-app:latest

#docker push 685279936327.dkr.ecr.ap-south-1.amazonaws.com/basic-app:latest

