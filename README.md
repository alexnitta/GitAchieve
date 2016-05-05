# GitAchieve [![Build Status](https://travis-ci.org/Groovy-Narwhal/GitAchieve.svg?branch=master)](https://travis-ci.org/Groovy-Narwhal/GitAchieve)
A webapp to promote positive Git behavior through friendly competition.
See GitAchieve in action at [**www.gitachieve.com**](http://www.gitachieve.com)

## Team
 - ![](https://avatars.githubusercontent.com/u/4149515?v=3&s=48)[**Inje Yeo**](https://github.com/byeo630)

 - ![](https://avatars.githubusercontent.com/u/15864056?v=3&s=48)[**Alex Nitta**](https://github.com/alexnitta)

 - ![](https://avatars.githubusercontent.com/u/10492144?v=3&s=48)[**Adam Isom**](https://github.com/adamrgisom)

 - ![](https://avatars.githubusercontent.com/u/15220759?v=3&s=48)[**Megan Smith**](https://github.com/msmith9393)

## Table of Contents
1. [How to get started](#how-to-get-started)
1. [Architecture](#architecture)
1. [Technologies](#technologies)

## How to get started
1. Clone down the repo `git clone https://github.com/Groovy-Narwhal/GitAchieve.git`
2. Change directory into GitAchieve `cd GitAchieve/`
3. Install dependencies `npm install`
4. Run the server `npm run serve`
5. Open your browser to `localhost:8000`

## Architecture
### Database Schema
Postgres Database Schema

### API Server Endpoints
|Endpoint|Request Type|Description|JSON Required|
|---|---|---|---|
|/api/v1/users|GET|Get list of all users|none|
|/api/v1/users|POST|Add a user|GitHub username, email|
|/api/v1/users/:id|GET|Get a user by id|none|
|/api/v1/users/:id|PATCH|Edit a user by id|property:newvalue pairs|
|/api/v1/users/:id|DELETE|Delete a user by id|GitHub username, email|
|/api/v1/users/:id/repos|GET|Get a user's repos|none|
|/api/v1/users/:id/repos|POST|Add a repo for a user|repo id, created_at, watchers_count, stargazers_count, forks_count|
|/api/v1/users/:id/friends|GET|Get a user's friends|none|
|/api/v1/users/:id/friends|POST|Primary user requests friendship with secondary user|primary user id, secondary user id, username and email|
|/api/v1/users/:id/friends|PATCH|Confirm a friend request or remove a friendship|remove:true to remove friendship|

### Client Side Routes
|Route|Description|Related Server Endpoints|
|---|---|---|
|/login|Login page with logo, tagline, and GitHub login button|Handled via passport in auth.js|

## Technologies
### Front End
- React
- Redux
- D3.js

### Back End
- NodeJS
- ExpressJS
- Postgres

### Testing
- Mocha/Chai
- JSHint

### Deployment
- AWS EC2
- Travis CI
