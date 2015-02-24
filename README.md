bootstrap_s
===========

>WordPress starter theme based on Underscores using Bootstrap with LESS for responsiveness, Grunt.js for automation and Bower for front end package management.

It is assumed that you already have Grunt, Bower and LESS installed on your local machine.

You also need `grunt-init`, which you can install globally with 
```
npm install -g grunt-init
```

To clone the repository and add the template to grunt-init for automated project scaffolding run
```
git clone git@github.com:4Digits/bootstrap_s.git ~/.grunt-init/bootstrap_s
```


## Installation

Install a copy of WordPress on your localhost. Cd into your themes folder with
```
cd /var/www/YourWordPressInstallation/wp-content/themes
```
and create a new, empty theme folder. 


### 1. Generate the template files in your empty theme folder

```
grunt-init bootstrap_s
```
You should give your theme a title and function-prefix (e.g. MyTheme / mytheme).

### 2. Install all required NPM modules

```
npm install
```


### 3. Install Bootstrap and other frontend dependencies with Bower

To add your packages of choice, modify ```bower.json``` and run

```
bower install
```


### 4. Compile folder structure with Grunt

```
grunt compile
```

### 5. Monitor your filesystem for changes

```
grunt
```
In order to monitor file changes in real time without manually refreshing your browser, install [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) for Chrome and run it in your tab.

### Enjoy :)
