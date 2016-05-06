const https = require('https');
const http = require('http');
const fs = require('fs');
const db = require('../db/database.js').db;
const pgp = require('../db/database.js').pgp;
const PORT = require('../config/config-settings').PORT;
const HOST = require('../config/config-settings').HOST;

exports.getOrAddUser = function(accessToken, refreshToken, profile, cb) {
  const id = profile._json.id;
  const created_ga = pgp.as.date(new Date());
  const username = profile._json.login;
  const email = profile._json.email;
  const avatar_url = profile._json.avatar_url;
  const followers = profile._json.followers;
  const following = profile._json.following;
  
  db.any('INSERT INTO $1~ ($2~, $3~, $4~, $5~, $6~, $7~, $8~) ' +
    'SELECT $9, $10, $11, $12, $13, $14, $15 WHERE NOT EXISTS ' +
    '(SELECT * FROM $1~ WHERE $2~ = $9)',
    ['users', 'id', 'username', 'email', 'created_ga', 'avatar_url', 'followers', 'following', 
    id, username, email, created_ga, avatar_url, followers, following])
    .then((data) => {
      console.log('data in gitHubMiner', data);
      return cb(null, {data: profile._json, token: accessToken});    
    })
    .catch((error) => {
      console.error(error);
    });
  
  var options = {
    host: HOST,
    port: PORT,
    path: '/api/v1/users/' + id + '/repos',
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  
  var request = http.request(options, function(response) {
    var data = '';
    response.on('data', function(chunk) {
      data += chunk;
    });
    response.on('end', function() {
      console.log(data);
    });
  });
  
  request.end();
  
};

exports.getRepos = function(username, callback) {
  console.log('in gitHubMiner getRepos');
  var options = {
    host: 'api.github.com',
    port: '443',
    path: '/users/' + username + '/repos',
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': username
    }
  };
  
  var request = https.request(options, function(response) {
    var data = '';
    response.on('data', function(chunk) {
      data += chunk;
    });
    response.on('end', function() {
      callback(data);
    });
  });
  
  request.end();

};
  
  
    /*
  app.get('/board',function(req,res) {
    if (!req.session.uid) {
        return res.redirect('/');
    }
    var repos,
        opts = {
      host: "api.github.com",
      path: '/user/repos?access_token=' + req.session.oauth,
      method: "GET"
    },
      request = https.request(opts, function(resp) {
        var data = "";
        resp.setEncoding('utf8');
    resp.on('data', function (chunk) {
      data += chunk;
    });
    resp.on('end', function () {
      repos = JSON.parse(data); 
      res.render('board',{username: req.session.uid, repos: repos});
    });
      });
    request.end();
    */
  
  
  // var writeStream = fs.createWriteStream('./tempRepo.js');
    
  // var req = https.request(options, (res) => {
  //   console.log('statusCode: ', res.statusCode);
  //   console.log('headers: ', res.headers);
  //   writeStream.pipe(res);
  //   writeStream.on('end', function() {
  //     callback(writeStream);
  //   });
  // });
  // req.end();

  // req.on('error', (err) => {
  //   console.error(err);
  // });

