# Sprinkles
This is the UI component of our corporate carpool app.

# How to develop
1. Make sure you have `node` and `npm` installed

2. Install `gulp` and `bower` globally
	```sh
	$ npm install gulp -g
	$ npm install bower -g
	```

3. Checkout sprinkles and install `npm`  and `bower` dependencies
	```sh
	$ cd sprinkles/
	$ npm install
	$ bower install
	```

4. Start the development server (Browserfy options are on port 3001)
	```sh
	$ gulp serve
	```
5. Add your google maps api-key to apps.ts and index.html
  ```
  key : "API_KEY"
  src="https://maps.googleapis.com/maps/api/js?v=3&key=API_KEY&callback=initialize">
	```

# How to test

##Unit Tests:
	1. Run `npm install`

	2. Run `gulp unit-tests`

##End-to-End Tests using protractor
	1. Run 'npm install'

	2. Run `./node_modules/protractor/bin/webdriver-manager update` to update the webdriver

	3. Make sure that rethinkdb (`rethinkdb --http-port 9090`), wafflecone(`gulp` in wafflecone directory) and sprinkles(`gulp serve` in sprinkles directory) are all running
