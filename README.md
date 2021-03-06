# php-config-loader

Webpack plugin that transforms php file into JSON object.

## What's the use case?

An app might have a backend side written in PHP and there are resources that would be good to share between the backend and frontend like: configurations, translations. One way is to transform php array configuration into JSON object and bundle it with Webpack. This plugin may help.

## Installation

```
npm install php-config-loader
```

Add to `webpack.config.js` under `module.rules`:
```js
{
    test: /\.php$/,
    use: [
        {
            loader: "php-config-loader",
        }
    ]
}
```

Then in your `js` file:
```
import config from "../config.php";
```

## Development

```
npm test
git add .
git commit
npm version
npm publish --access=public
```

## License

MIT
