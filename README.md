# raidbot3000

The Fabulous Raidbot 3000

## How to develop

- Use Node 8.9.4
- Use Yarn
- Use Docker & Docker-compose
- Copy .env-sample to .env and fill in the details (get a bot token from discord)
- Install development dependencies with `yarn install`
- Start the bot by running `docker-compose up`
- Stop the bot by running `docker-compose down`
- Dev-server runs nodemon so changes to code will be hot-reloaded

## Development guidelines

- Project uses ESLint, Prettier to maintain code style
- Linter and Prettier are ran precommit
- Use EditorConfig in your editor
