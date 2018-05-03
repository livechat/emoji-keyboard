# LiveChat Emoji Keyboard

Agent App Widget for Emoji Keyboard in the LiveChat app.

## Getting Started

Remember that this project is available as a public app in LiveChat marketplace. You can install it via [this link](https://my.livechatinc.com/settings/apps?install=NxBGpEfqXnnBFKeF). The following instructions will guide you through installation process required for development.

### Prerequisites

Emoji Keyboard is a front-end app only, so you don’t need back-end server to run it. We use `npm` manager to include and install modules. [Here is how to install npm](https://www.npmjs.com/get-npm).

The project also uses `SASS` as stylesheets pre-processor. [Here is how to install it](https://sass-lang.com/install).

### Installing

The first step to work on this project is to clone the repository. Then you should run the following command to install required modules:

```
npm install
```

And that's all! Now you have own fully functional fork of Emoji Keyboard 😎

## Development and Deployment

Code mostly speaks for itself. However, there are a few points that you should remember about:
* as LiveChat Agent App Widget SDK is loaded via `npm`, it is more convenient for development process to use node.js packages only
* to run `npm` packages on visitor’s end, we use a tool called `browserify` and create the `bundle.js` file
* for production builds we minify JS code using the `tinyify` plugin and `babelify` for compatibility with ES5  

## Built With

* [SASS](https://sass-lang.com/)
* [npm](https://www.npmjs.com/)
* [browserify](http://browserify.org/)
* [tinyify](https://github.com/browserify/tinyify)
* [jquery-browserify](https://www.npmjs.com/package/jquery-browserify)
* [if-emoji](https://www.npmjs.com/package/if-emoji)
* [emoji-data.json](https://github.com/iamcal/emoji-data)
* [babelify](https://github.com/babel/babelify)

## Contributing

1. Create a fork of this repository.
2. Create a new branch that describes your contribution, i.e.
    - feature/search-tool
    - fix/broken-links
    - update/gpl-v4-license
3. When your code is developed and tested remember to:
    - bump version in `package.json`
    - bump version for `emojis.js` and `style.scss/style.css` (also inside `index.html` file)
    - run `browserify -p tinyify js/client.js -o js/bundle.X.X.X.js -t [ babelify --presets [ "babel-preset-env"] ]` command, where `X.X.X` is the new version

## License

This project is licensed under the GPL v3 License - see the [LICENSE.md](LICENSE.md) file for details.

## Changelog

**1.3.1**
* Added support for ES5 with `babelify`
* Added visual callback if emojis are not supported
* Minor fixes

**1.2.0**
* `README.md`, `LICENSE.md`
* `tinyify` implementation

**1.0.0**
* First widget version