# jf-branch-protect
A [GitHub App](https://developer.github.com/apps/about-apps/) to apply master branch protection rule when repo is created

## Overview 
This GitHub App is developed in [Node.js](https://nodejs.org/en/) under framework [Probot](https://probot.github.io/)

## Features
Once installed in your [GitHub Organisation]
* Apply branch protection rules to master branch when a new repository is created
* An issue is created to list the rule details. The creator is also notified via an @

## Usage
This GitHub App can be deployed on your local computer as a docker container.

Once deployed, register the app to your GitHub account or GitHub organization or it to work.
### Pre-requisite
You have a computer with Linux installed
You have a GitHub account for App registration
Your computer has internet access
Please also ensure you have the following installed:
* docker
* docker-compose

### Deploy the App
1. Clone this repository to you local environment
2. Jump into the folder, create an environment file
```
cp .env.example .env
```
3. Open [smee](https://smee.io/new) then create a new channel. 
4. Copy the channel URL and update the WEBHOOK_PROXY_URL in the _.env_** file. It should look like this
```
WEBHOOK_PROXY_URL=https://smee.io/rd4CbXHwRTQPFP55
```
5. Build and run with the following:
```
docker-compose up
```
6. The app is now running and listening on http://localhost:3000

### Register the App
1. Open http://localhost:3000, click to register the App
2. Name the way you like and select the GitHub account or organization to install
3. You are all set!

