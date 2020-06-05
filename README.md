[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fsizief%2Fpomodoro%2Fbadge%3Fref%3Dmaster&style=for-the-badge)](https://actions-badge.atrox.dev/sizief/pomodoro/goto?ref=master)    
[Pomodoro.works](https://pomodoro.works). Built with React / Ruby Sinatra / Docker compose / Nginx

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
- Clone this repo, change the values in `app/.env` and `api/.env.prod`
- Run `docker-compose -f docker-compose-prod.yml build`
- Run `docker-compose -f docker-compose-prod.yml up`

### TODO
- In production, all requests for inner urls are redirected to index (react router). I hard coded paths in traefik label because I don't want to create a Nginx file just for this. But it is not clean. In the future create an Nginx config for app container and do 
```
location / {
  try_files $uri /index.html;
}
```
