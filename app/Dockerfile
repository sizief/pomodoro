FROM node:13.14.0-slim
ENV APP_ROOT /var/www/pomodoro
WORKDIR $APP_ROOT
COPY package.json package-lock.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000
CMD ["./config/container.sh"]
