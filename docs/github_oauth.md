# GitHub oAuth setup 

You'll need to set up a GitHub organization and add an oAuth app for GitAchieve. You'll set this up with a local Homepage URL and Authorization Callback URL as follows:

**Application name**: GitAchieve [dev]

**Homepage URL**: http://127.0.0.1:8000

**Application description**: A web application to gamify git.

**Authorization callback URL**: http://127.0.0.1:8000/auth/github_oauth

Once you've done this, copy the **Client ID** and **Client Secret** and use them to set up your [config files](config_files.md).

If you are deploying the site in production, you'll need to set up a separate GitHub app with URLs that use your live domain name.
