# NHS Auth UI

[![Greenkeeper badge](https://badges.greenkeeper.io/Nebo15/nhs.auth.web.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/Nebo15/nhs.auth.web.svg?branch=master)](https://travis-ci.org/Nebo15/nhs.auth.web)

[![Build history](https://buildstats.info/travisci/chart/Nebo15/nhs.auth.web)](https://travis-ci.org/Nebo15/nhs.auth.web)

Demo: http://nhs-auth-web.herokuapp.com/

## Installation

### Heroku One-Click Deployment

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/nebo15/nhs.auth.web)

### Docker

Dashboard can be deployed as a single container from [nebo15/nhs.auth.web](https://hub.docker.com/r/nebo15/nhs.auth.web/) Docker Hub.

## Configurations

Application supports these environment variables:

| Environment Variable  | Default Value           | Description |
| --------------------- | ----------------------- | ----------- |
| `PORT`                | `8080`                  | Node.js server port. |
| `CLIENT_ID`           | `66613666`              | Auth client ID. |
| `AUTH_COOKIE_NAME`    | `token`                 | Auth token cookie name. |
| `SITEMAP_HOSTNAME`    | `http://localhost:8080` | URL will be used in sitemap generated urls |
| `LANG_COOKIE_NAME`    | `lang`                  | Name of the cookie, where storing language variable |

## Docs

[Mithril API Doc](http://docs.mithril1.apiary.io/).

## Technologies

- React
- Redux
- Webpack
- Enzyme
- Karma
- Nightwatch

## Workflow

### Git flow

Every task should start a new branch. Branch should be named as task number what its corresponding.
After finish work on a task, you need to create PR.

### Testing

To contribute to the repository be ready to write some tests.

- Unit tests for business logic (we use Mocha)
- Integration tests for UI components (we use Enzyme)
- Acceptance tests for user stories (we use Nightwatch)

### PR

Every task finishes with PR. Eslint, Stylelint, and tests are blocking PRs. To simplify PR review, we deploy every PR's branch automatically on Heroku.