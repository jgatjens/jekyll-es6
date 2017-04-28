#!/bin/sh
echo '-- task min vendors --'
./node_modules/.bin/uglifyjs \
		 ./_includes/js/vendors/in-view.min.js \
		 ./_includes/js/vendors/jquery.min.js \
		 ./_includes/js/vendors/slick.min.js \
		 -o ./assets/js/vendor.min.js





