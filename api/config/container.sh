#!/usr/bin/env bash

if [[ -z "$ENTRYPOINT" || "$ENTRYPOINT" = "app" ]]
then
  bundle exec rake db:migrate
  bundle exec ruby app.rb
elif [ "$ENTRYPOINT" = "test" ]
then
  bundle exec rake db:migrate
  bundle exec rspec spec
  exit 0
fi
