# Database setup

1. Create a database log file:
  ```bash
  cd GitAchieve
  mkdir server/logs
  touch server/logs/db-errors.log
  ```
2. Install Postgres and the CLI if you don't have it yet. One simple way is through https://postgresapp.com/.
3. Ensure that Postgres is up and running locally at port 5432, and that you have created a database called `gitachieve` under the user `postgres`.
  ```bash
  psql -U postgres
  create database gitachieve;
  ```
