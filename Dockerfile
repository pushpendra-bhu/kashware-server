FROM node:12.13.1-stretch

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install yarn global dependencies
RUN yarn global add

COPY package.json .
COPY yarn.lock .

RUN yarn install

# Bundle app source
WORKDIR /usr/src/app

ARG ENV=production

COPY . /usr/src/app

EXPOSE 8020

CMD [ "yarn", "start"]
                       
