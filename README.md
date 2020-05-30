[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fsizief%2Fpomodoro%2Fbadge%3Fref%3Dmaster&style=for-the-badge)](https://actions-badge.atrox.dev/sizief/pomodoro/goto?ref=master)    
[Pomodoro.works](https://pomodoro.works). Built with React / Ruby Sinatra / Docker compose / Nginx

### Development
- Add this to `/etc/hosts` -> `127.0.0.1        dev.pomodoro.works      dev-api.pomodoro.works` (dev url is already added to [Google](https://console.developers.google.com/apis/credentials?project=pomodoro-1574243762652)). Then get `token_id` from the google console, and save it to `./api/.env`
- Cd to root of project and run `tmuxinator start`

Now you can visit `dev.pomodoro.works:3000` and it should be working fine.

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
- Install CERTBOT. Renew with `certbot renew`

### TODO
- SSl
- remote uris are not working
- remove storybook
- remove nivou
