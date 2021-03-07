[Pomodoro.aliday.me](https://pomodoro.aliday.me). Built with React / Ruby Sinatra / Docker compose / Nginx / Traefik

### Development
- Add this to `/etc/hosts` -> `127.0.0.1        dev.pomodoro.aliday.me      dev-api.pomodoro.aliday.me    dev-traefik.pomodoro.aliday.me` (dev url is already added to [Google](https://console.developers.google.com/apis/credentials?project=pomodoro-1574243762652)). Then get `token_id` from the google console, and save it to `./app/.env.prod`
- Cd to root of project and run `docker-compose -f docker-compose-dev.yml up --build`

Now you can check app at `dev.pomodoro.aliday.me` and traefik at `dev-traefik.pomodoro.aliday.me`

- Connect to DB:
  - `docker exec -it pomodoro_db_1 sh`
  - `psql -U pomodoro`
  - `\c pomodoro`
- Create new migration with `bundle exec rake db:create_migration NAME=create_users`  
- Run migrations with `bundle exec rake db:migrate`
- Run migration for other ENVs `bundle exec rake db:migrate RACK_ENV=test`
- Run to see StoryBook `npm run storybook`
- Run `yarn` to install dependencies and `yarn upgarde` to upgarde all dependencies.
- Run `npx eslint [file_name] --fix` to autofix
- Cert managed by CloudFlare

### Deployment
- Clone this repo, change the values in `api/.env.db` and then address it in docker-compose-prod file in `db` section.
- Setup nginx 'sudo systemctl restart nginx'. Files are in nginx folder in root.
- In production run `GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID docker-compose -f docker-compose-prod.yml up --build`
- [CI](https://app.circleci.com/pipelines/github/sizief/pomodoro) is triggered on each commit on master 
### TODO
- fix login on development
- access_id is returning as null in prod :shrug:
- show no activity if non exists
- white page in all pages but pomodoro
- show total for a week

- In production, all requests for inner urls are redirected to index (react router). I hard coded paths in traefik label because I don't want to create a Nginx file just for this. But it is not clean. In the future create an Nginx config for app container and do 
```
location / {
  try_files $uri /index.html;
}
```
