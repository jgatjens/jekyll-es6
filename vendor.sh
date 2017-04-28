#!/bin/sh
echo '-- task min vendors --'

./node_modules/.bin/uglifyjs \
		 ./assets/vendor/js/in-view.min.js \
		 ./assets/vendor/js/jquery.min.js \
		 ./assets/vendor/js/slick.min.js \
		 -o ./assets/vendor/vendor.min.js

./node_modules/.bin/cleancss -o ./assets/vendor/vendor.min.css \
			./assets/vendor/css/normalize.css \
			./assets/vendor/css/slick.css





