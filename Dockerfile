FROM node

WORKDIR /app

# copy dependency files
COPY package-lock.json ./
COPY package.json ./

# install dependency
RUN npm ci
# copy source code
COPY . ./
# create build
RUN npm run build
# copy build
COPY ./build ./

# create NGINX server, copy and serve build
FROM nginx
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]