# Config Files

To avoid exposing sensitive credentials, the following configuration files are `gitignore`d. 

You must create these files locally before the app will run.

- `server/config/dbConfig.js`
  ```javascript
  // When working on the dev server, these values are not used.
  
  exports.DB_DEPLOY_CONFIG = {
    host: '',                   // server name or IP address 
    port: 5432,                 // 5432 is the default Postgres port
    database: 'gitachieve',     
    password: '',               // put your password here
  };
  ```

See notes in [GitHub oAuth](docs/github_oauth.md) to set up your Client ID and Client Secret.
  
- `server/config/github.config.js`
  ```javascript
  // your GitHub oAuth Client ID
  exports.id = '';

  // your GitHub oAuth Client Secret
  exports.secret = '';

  // your GitHub API token
  exports.token = '';
  ```
  
- `server/config/sendGridKey.js`
  ```javascript
  // your SendGrid API key
  exports.default = '';
  ```

  
