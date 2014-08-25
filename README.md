# Installation

- **[WordPress Core:](https://github.com/WordPress/WordPress)** All of the wordpress core files have been ignored in git. You will need to download the latest version and manually copy the core files in to the root folder of the repo. *If you run `npm install` it will automatically grab the Wordpress core and copy the files needed after the installation.
- **[Composer:](https://getcomposer.org/)** Composer is used to install dependencies for timber.
- **[NodeJS & NPM:](http://nodejs.org/)** Node is used for running grunt tasks.

1. Initialize and update git submodules - `git submodule update --init --recursive`
2. Install Timber's dependencies and move back to project root - `cd www/wp-content/themes/theme/lib/timber && composer install && cd ../../../../../../`
3. Install all node packages - `npm install`
4. Install all front-end dependencies from bower, compile & concatenate javascripts and less, and copy files to shop folder - `grunt setup`
5. To download WordPress files (if needed) run `git clone https://github.com/WordPress/WordPress.git; cd WordPress/; git checkout tags/3.9.1; cd ../; cp -nr WordPress/* www/; rm -rf WordPress/`. You will also need to set up a database and hook wordpress up to it by editing `www/wp-config.php`.

## Development

Run `grunt copy` to copy all the needed css and js files from the `www/` directory to the `shop/` directory (this will be done automatically by running `grunt setup`). Often, you will need to do this after pulling changes to assets. **Do not edit any css, js, img, or fonts within the `shop/` and `www/` directories. THESE CHANGES ARE IGNORED IN GIT!!** Instead, while developing, run the `grunt` default task to setup the static file server and poll for changes on files in the `assets/` folder, then make your changes to any css, js, img, or font in the `assets/` folder. These changes will be automatically copied to the `shop/` and WordPress theme folders.


### Grunt Tasks

- `grunt bowercopy` - Downloads front-end deps using bower, copies them to their respective folders, then removes `bower_components/`
- `grunt copy` - Copies javascript, css, images, and fonts from the `assets/` folder to the WordPress theme folder in `www/` and `shop/`
- `grunt less` - Compiles less to css
- `grunt jshint` - Lints javascript source files
- `grunt uglify` - Concatenates and minifies javascript
- `grunt watch`  - Polls for changes in files to run `less` `jshint` and `uglify` as well as `copy` tasks, runs a live reload server
- `grunt build` -  Runs `uglify:site` followed by `less:production`
- `grunt setup` -  Runs `bowercopy` followed by `build` and `copy`
- `grunt` -  Runs `connect` and `watch`