# kutuzov-bot
Simple Starcraft 2 rule-based written in nodejs.

## Getting started
```bash
# Install dependencies.
$ npm install

# Copy the default config and fill it with target map, race etc.
$ cp config/default.js config/development.js

# Launch the bot.
$ npm start
```

## Bundling
```bash
# To create a unified bundle of bot sources and packages with nodejs runtime do:
$ npm run build
```

## Hacking && Testing
```bash
# Run the bot with extended debug logs.
$ npm run start:debug

# Check the code with eslint.
$ npm run lint

# Run unit tests.
$ npm run test

# Play against the bot by controlling another idle bot.
$ npm run test:manual
```

## License
Copyright (c) 2020-2021 Alexander Kurbatov

Licensed under the [MIT license](LICENSE).
