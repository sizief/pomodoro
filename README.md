[![Build status](https://badge.buildkite.com/f22d7268b9647a9aa4288ec1d509e9d181679677139340e2de.svg)](https://buildkite.com/pomodoro-1/production)
[Pomodoro.works](https://pomodoro.works). Built with React / Ruby Sinatra / Docker compose / Nginx / Traefik

### Development
- Add this to `/etc/hosts` -> `127.0.0.1        dev.pomodoro.works      dev-api.pomodoro.works    dev-traefik.pomodoro.works` (dev url is already added to [Google](https://console.developers.google.com/apis/credentials?project=pomodoro-1574243762652)). Then get `token_id` from the google console, and save it to `./api/.env`
- Cd to root of project and run `tmuxinator start`

Now you can check app at `dev.pomodoro.works` and traefik at `dev-traefik.pomodoro.works`

- Create new migration with `bundle exec rake db:create_migration NAME=create_users`  
- Run migrations with `bundle exec rake db:migrate`
- Run migration for other ENVs `bundle exec rake db:migrate RACK_ENV=test`
- Run to see StoryBook `npm run storybook`
- Run `yarn` to install dependencies and `yarn upgarde` to upgarde all dependencies.
- Run `npx eslint [file_name] --fix` to autofix

### Deployment
- Clone this repo, change the values in `api/.env.prod`
- Enable or disable Buildkite: `sudo systemctl enable buildkite-agent && sudo systemctl start buildkite-agent`
- in production run `GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID docker-compose -f docker-compose-prod.yml up --build`

### TODO
- remove api/.end.prod
- In production, all requests for inner urls are redirected to index (react router). I hard coded paths in traefik label because I don't want to create a Nginx file just for this. But it is not clean. In the future create an Nginx config for app container and do 
```
location / {
  try_files $uri /index.html;
}
```
