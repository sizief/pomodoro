[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fsizief%2Fpomodoro%2Fbadge%3Fref%3Dmaster&style=for-the-badge)](https://actions-badge.atrox.dev/sizief/pomodoro/goto?ref=master)    
[Pomodoro.works](https://pomodoro.works). Built with React and Ruby Sinatra. 

### Development

- Add this to `/etc/hosts` -> `127.0.0.1        dev.pomodoro.works      dev-api.pomodoro.works` (dev url is already added to [Google](https://console.developers.google.com/apis/credentials?project=pomodoro-1574243762652)). Then get `token_id` from the google console, and save it to `./api/.env`
- Copy `api/.env.example` to `api/.env` and update the values
- Cd to root of project and run `tmuxinator start`

Now you can visit `dev.pomodoro.works:3000` and it should be working fine.

- Create new migration with `bundle exec rake db:create_migration NAME=create_users`  
- Run migrations with `bundle exec rake db:migrate`
- Run migration for other ENVs `bundle exec rake db:migrate RACK_ENV=test`
- Run to see StoryBook `npm run storybook`
- Run `yarn` to install dependencies and `yarn upgarde` to upgarde all dependencies.
- Run `npx eslint [file_name] --fix` to autofix

### Deployment

We need two places to host code. 
- First one is `/srv/pomodoro/api` to host `api.pomodoro.works`. Put [Nginx config](api/config/api.nginx) under `/etc/nginx/sites-available/api.pomodoro.works`. Use following commands to debug
  `sudo nginx -t` to check the config file  
  `sudo tail -f \var\log\nginx\access.log`
- Copy service config for puma from [here](api/config/api.systemd) and put it to `/etc/systemd/system/pomodoro.service`
- Use following commands to start, stop and debug service:  
  `systemctl daemon-reload` reload after each change in config file  
  `journalctl -u pomodoro.service -f` to check the service logs  
  `sudo  systemctl enable` to autostart it on boot  
  `sudo systemctl start pomodoro.service`  
  `sudo systemctl stop pomodoro.service`  
  `sudo systemctl status pomodoro.service`  
- For more info about Ngin x setup check [this post](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04).   
- Install CERTBOT. Renew with `certbot renew`
- Secon place is for React app which hosted by Nginx as a static web server. It is hosted by Nginx under `/srv/pomodoro/` and the config is [here](app/config/app.nginx) 
- Check the npm version in `.node_version` and use `asdf global node {version}` and then Run `npm run build` to build.
- Don't forget to `mv .env.example .env` both for api and app


## TODO
- remove storybook      
