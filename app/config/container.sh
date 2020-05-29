#!/usr/bin/env bash

if [[ -z "$ENTRYPOINT" || "$ENTRYPOINT" = "development" ]]
then
  npm start
elif [ "$ENTRYPOINT" = "test" ]
then
  npm test
fi
