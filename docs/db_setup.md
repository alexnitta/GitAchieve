# Database setup

1. Create your local config files if you haven't already (see (./config_files.md)).
2. Create a database log file:
  ```bash
  cd GitAchieve
  mkdir server/logs
  touch server/logs/db-errors.log
  ```
3. Install Postgres and the CLI if you don't have it yet. One simple way is through https://postgresapp.com/.
4. Ensure that Postgres is up and running locally at port 5432, and that you have created a database called `gitachieve` under the user `postgres`.
  ```bash
  psql -U postgres
  create database gitachieve;
  ```
