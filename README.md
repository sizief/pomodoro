A simple POMODORO app. Built with React and Ruby Sinatra.

### Development

- Cd to root of project and run `tmuxinator start`. It will open three `tmux` with three tabs. One for API, one for React front and one for npm development server.   
- Api is set at localhost:4000  
- To test the Google Oauth, set any domain you want in /etc/host and add url to [Google](https://console.developers.google.com/apis/credentials?project=pomodoro-1574243762652). Then get `token_id`, and save it to `api/.env`
- This app uses `POstgres`. Check [this post for installing Postgress](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04). Also don't forget to install `sudo apt install libpq-dev`. And then [here](https://github.com/sizief/cheatsheet/blob/master/postgres.md) to add user and database.
- Create new migration with `bundle exec rake db:create_migration NAME=create_users`  
- Run migrations with `bundle exec rake db:migrate`
- Run Migration for other ENVs `bundle exec rake db:migrate RACK_ENV=test`
- Run to see StoryBook `npm run storybook`

### Deployment

We need two places to host code. 
- First one is `/srv/pomodoro/api` to host `api.pomodoro.works`. Put [Nginx config](api/config/api.nginx) under `/etc/nginx/sites-available/api.pomodoro.works`. 
- Copy service config for puma from [here](api/config/api.systemd) and put it to `/etc/systemd/system/pomodoro.service`
- Use following commands to start, stop and debug service:  
  `systemctl daemon-reload` reload after each change in config file  
  `journalctl -u pomodoro.service -f` to check the service logs  
  `sudo  systemctl enable` to autostart it on boot
  `sudo systemctl start pomodoro.service`  
  `sudo systemctl stop pomodoro.service`  
  `sudo systemctl status pomodoro.service`  
- Secon place is for React app which hosted by Nginx as a static web server. It is hosted by Nginx under `/srv/pomodoro/` and the config is [here](app/config/app.nginx) 
- To restart Nginx: `sudo systemctl restart nginx`. For more info check [this post](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04).   
- Run `npm run build` to build.
- Don't forget to `mv .env.example .env` both for api and app
