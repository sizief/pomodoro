FROM ruby:2.6-slim
RUN bundle config --global frozen 1
RUN apt-get update; apt-get install -y build-essential postgresql postgresql-contrib libpq-dev
ENV APP_ROOT /var/www/pomodoro
WORKDIR $APP_ROOT
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
CMD ["./config/container.sh"]
