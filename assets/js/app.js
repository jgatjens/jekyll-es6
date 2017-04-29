(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _carousel = require('./carousel');

var _carousel2 = _interopRequireDefault(_carousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init app funcionality
$(function () {
	new _carousel2.default();
}); // imports

},{"./carousel":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $select = {
	ele: '.bd-carousel',
	prev: '.bd-prev',
	next: '.bd-next'
};

var Carousel = function () {
	function Carousel() {
		var _this = this;

		_classCallCheck(this, Carousel);

		this.storage = new _storage2.default();
		this.http = new _http2.default();

		this.currentId = this.storage.getPage();

		this.ele = $($select.ele).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			arrows: false
		});

		$($select.next).on('click', function () {
			return _this.nextPage();
		});
		$($select.prev).on('click', function () {
			return _this.prevPage();
		});

		this.ele.on('afterChange', function (event, slick, index) {
			_this.storage.setPage(index);
		});

		this.nextPage();
	}

	_createClass(Carousel, [{
		key: 'prevPage',
		value: function prevPage() {
			var _this2 = this;

			if (this.currentId > 1) {
				setTimeout(function () {
					_this2.ele.slick('slickRemove', _this2.currentId);
				}, 500);

				this.currentId--;
				this.ele.slick('slickPrev');
			}
		}
	}, {
		key: 'nextPage',
		value: function nextPage(event) {
			var _this3 = this;

			this.currentId++;
			this.http.request(this.currentId).then(function (page) {
				_this3.ele.slick('slickAdd', page);
				setTimeout(function () {
					_this3.ele.slick('slickNext');
				}, 200);
			}).fail(function () {
				_this3.currentId--;
				console.warn('bd-pharma:: there is not page to load!');
			});
		}
	}]);

	return Carousel;
}();

// `
// 	<div>
// 		<div class="page-slide bg-red">
// 			<img data-lazy="http://placehold.it/350x150?text=Slide+${this.currentId}" />
// 		</div>
// 	</div>
// `

exports.default = Carousel;

},{"./http":3,"./storage":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Http = function () {
	function Http() {
		_classCallCheck(this, Http);

		console.log('new Http');
	}

	_createClass(Http, [{
		key: 'request',
		value: function request(id) {
			var defer = $.Deferred();
			var page = '/slides/slide-' + id + '.html';

			$.get(page, function (data) {
				return defer.resolve(data);
			}).fail(function (e) {
				return defer.reject(e);
			});

			return defer;
		}
	}]);

	return Http;
}();

exports.default = Http;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
	function Storage() {
		_classCallCheck(this, Storage);
	}

	_createClass(Storage, [{
		key: 'setPage',
		value: function setPage(currentId) {
			localStorage.setItem('page', currentId);
		}
	}, {
		key: 'getPage',
		value: function getPage() {
			return localStorage.getItem('page') || 0;
		}
	}]);

	return Storage;
}();

exports.default = Storage;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfaW5jbHVkZXMvanMvYXBwLmpzIiwiX2luY2x1ZGVzL2pzL2Nhcm91c2VsLmpzIiwiX2luY2x1ZGVzL2pzL2h0dHAuanMiLCJfaW5jbHVkZXMvanMvc3RvcmFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0E7Ozs7OztBQUVBO0FBQ0EsRUFBRSxZQUFNO0FBQ1A7QUFDQSxDQUZELEUsQ0FKQTs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sVUFBVTtBQUNmLE1BQUssY0FEVTtBQUVmLE9BQU0sVUFGUztBQUdmLE9BQU07QUFIUyxDQUFoQjs7SUFNTSxRO0FBQ0wscUJBQWM7QUFBQTs7QUFBQTs7QUFDYixPQUFLLE9BQUwsR0FBZSx1QkFBZjtBQUNBLE9BQUssSUFBTCxHQUFZLG9CQUFaOztBQUVBLE9BQUssU0FBTCxHQUFpQixLQUFLLE9BQUwsQ0FBYSxPQUFiLEVBQWpCOztBQUVBLE9BQUssR0FBTCxHQUFXLEVBQUUsUUFBUSxHQUFWLEVBQWUsS0FBZixDQUFxQjtBQUMvQixpQkFBYyxDQURpQjtBQUUvQixtQkFBZ0IsQ0FGZTtBQUcvQixhQUFVLEtBSHFCO0FBSS9CLFdBQVE7QUFKdUIsR0FBckIsQ0FBWDs7QUFPQSxJQUFFLFFBQVEsSUFBVixFQUFnQixFQUFoQixDQUFtQixPQUFuQixFQUE0QjtBQUFBLFVBQU0sTUFBSyxRQUFMLEVBQU47QUFBQSxHQUE1QjtBQUNBLElBQUUsUUFBUSxJQUFWLEVBQWdCLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCO0FBQUEsVUFBTSxNQUFLLFFBQUwsRUFBTjtBQUFBLEdBQTVCOztBQUVBLE9BQUssR0FBTCxDQUFTLEVBQVQsQ0FBWSxhQUFaLEVBQTJCLFVBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXlCO0FBQ25ELFNBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsS0FBckI7QUFDQSxHQUZEOztBQUlBLE9BQUssUUFBTDtBQUNBOzs7OzZCQUVVO0FBQUE7O0FBQ1YsT0FBSSxLQUFLLFNBQUwsR0FBaUIsQ0FBckIsRUFBdUI7QUFDdEIsZUFBVyxZQUFNO0FBQ2hCLFlBQUssR0FBTCxDQUFTLEtBQVQsQ0FBZSxhQUFmLEVBQThCLE9BQUssU0FBbkM7QUFDQSxLQUZELEVBRUcsR0FGSDs7QUFJQSxTQUFLLFNBQUw7QUFDQSxTQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsV0FBZjtBQUNBO0FBQ0Q7OzsyQkFFUSxLLEVBQU87QUFBQTs7QUFDZixRQUFLLFNBQUw7QUFDQSxRQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLEtBQUssU0FBdkIsRUFDRSxJQURGLENBQ08sVUFBQyxJQUFELEVBQVM7QUFDZCxXQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsVUFBZixFQUEyQixJQUEzQjtBQUNBLGVBQVcsWUFBTTtBQUNoQixZQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsV0FBZjtBQUNBLEtBRkQsRUFFRyxHQUZIO0FBR0EsSUFORixFQU1JLElBTkosQ0FNUyxZQUFNO0FBQ2IsV0FBSyxTQUFMO0FBQ0EsWUFBUSxJQUFSLENBQWEsd0NBQWI7QUFDQSxJQVRGO0FBVUE7Ozs7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztrQkFFZSxROzs7Ozs7Ozs7Ozs7O0lDbkVULEk7QUFDTCxpQkFBZTtBQUFBOztBQUNkLFVBQVEsR0FBUixDQUFZLFVBQVo7QUFDQTs7OzswQkFDTyxFLEVBQUk7QUFDWCxPQUFNLFFBQVEsRUFBRSxRQUFGLEVBQWQ7QUFDQSxPQUFNLDBCQUF3QixFQUF4QixVQUFOOztBQUVBLEtBQUUsR0FBRixDQUFNLElBQU4sRUFBWSxVQUFFLElBQUY7QUFBQSxXQUFZLE1BQU0sT0FBTixDQUFjLElBQWQsQ0FBWjtBQUFBLElBQVosRUFDRSxJQURGLENBQ08sVUFBQyxDQUFEO0FBQUEsV0FBTyxNQUFNLE1BQU4sQ0FBYSxDQUFiLENBQVA7QUFBQSxJQURQOztBQUdBLFVBQU8sS0FBUDtBQUNBOzs7Ozs7a0JBR2EsSTs7Ozs7Ozs7Ozs7OztJQ2ZULE87QUFDTCxvQkFBZTtBQUFBO0FBQUU7Ozs7MEJBRVQsUyxFQUFXO0FBQ2xCLGdCQUFhLE9BQWIsQ0FBcUIsTUFBckIsRUFBNkIsU0FBN0I7QUFDQTs7OzRCQUVTO0FBQ1QsVUFBTyxhQUFhLE9BQWIsQ0FBcUIsTUFBckIsS0FBZ0MsQ0FBdkM7QUFDQTs7Ozs7O2tCQUdhLE8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gaW1wb3J0c1xuaW1wb3J0IENhcm91c2VsIGZyb20gJy4vY2Fyb3VzZWwnO1xuXG4vLyBJbml0IGFwcCBmdW5jaW9uYWxpdHlcbiQoKCkgPT4ge1xuXHRuZXcgQ2Fyb3VzZWwoKTtcbn0pO1xuIiwiaW1wb3J0IEh0dHAgZnJvbSAnLi9odHRwJztcbmltcG9ydCBTdG9yYWdlIGZyb20gJy4vc3RvcmFnZSc7XG5cbmNvbnN0ICRzZWxlY3QgPSB7XG5cdGVsZTogJy5iZC1jYXJvdXNlbCcsXG5cdHByZXY6ICcuYmQtcHJldicsXG5cdG5leHQ6ICcuYmQtbmV4dCcsXG59O1xuXG5jbGFzcyBDYXJvdXNlbCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuc3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XG5cdFx0dGhpcy5odHRwID0gbmV3IEh0dHAoKTtcblxuXHRcdHRoaXMuY3VycmVudElkID0gdGhpcy5zdG9yYWdlLmdldFBhZ2UoKTtcblxuXHRcdHRoaXMuZWxlID0gJCgkc2VsZWN0LmVsZSkuc2xpY2soe1xuXHRcdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXG5cdFx0XHRpbmZpbml0ZTogZmFsc2UsXG5cdFx0XHRhcnJvd3M6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHQkKCRzZWxlY3QubmV4dCkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5uZXh0UGFnZSgpKTtcblx0XHQkKCRzZWxlY3QucHJldikub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5wcmV2UGFnZSgpKTtcblxuXHRcdHRoaXMuZWxlLm9uKCdhZnRlckNoYW5nZScsIChldmVudCwgc2xpY2ssIGluZGV4KSA9PiB7XG5cdFx0XHR0aGlzLnN0b3JhZ2Uuc2V0UGFnZShpbmRleCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLm5leHRQYWdlKCk7XG5cdH1cblxuXHRwcmV2UGFnZSgpIHtcblx0XHRpZiAodGhpcy5jdXJyZW50SWQgPiAxKXtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmVsZS5zbGljaygnc2xpY2tSZW1vdmUnLCB0aGlzLmN1cnJlbnRJZClcblx0XHRcdH0sIDUwMCk7XG5cblx0XHRcdHRoaXMuY3VycmVudElkLS07XG5cdFx0XHR0aGlzLmVsZS5zbGljaygnc2xpY2tQcmV2Jyk7XG5cdFx0fVxuXHR9XG5cblx0bmV4dFBhZ2UoZXZlbnQpIHtcblx0XHR0aGlzLmN1cnJlbnRJZCsrO1xuXHRcdHRoaXMuaHR0cC5yZXF1ZXN0KHRoaXMuY3VycmVudElkKVxuXHRcdFx0LnRoZW4oKHBhZ2UpPT4ge1xuXHRcdFx0XHR0aGlzLmVsZS5zbGljaygnc2xpY2tBZGQnLCBwYWdlKTtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5lbGUuc2xpY2soJ3NsaWNrTmV4dCcpXG5cdFx0XHRcdH0sIDIwMCk7XG5cdFx0XHR9KS5mYWlsKCgpID0+IHtcblx0XHRcdFx0dGhpcy5jdXJyZW50SWQtLTtcblx0XHRcdFx0Y29uc29sZS53YXJuKCdiZC1waGFybWE6OiB0aGVyZSBpcyBub3QgcGFnZSB0byBsb2FkIScpO1xuXHRcdFx0fSk7XG5cdH1cbn1cblxuLy8gYFxuLy8gXHQ8ZGl2PlxuLy8gXHRcdDxkaXYgY2xhc3M9XCJwYWdlLXNsaWRlIGJnLXJlZFwiPlxuLy8gXHRcdFx0PGltZyBkYXRhLWxhenk9XCJodHRwOi8vcGxhY2Vob2xkLml0LzM1MHgxNTA/dGV4dD1TbGlkZSske3RoaXMuY3VycmVudElkfVwiIC8+XG4vLyBcdFx0PC9kaXY+XG4vLyBcdDwvZGl2PlxuLy8gYFxuXG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbDtcbiIsImNsYXNzIEh0dHAge1xuXHRjb25zdHJ1Y3RvciAoKSB7XG5cdFx0Y29uc29sZS5sb2coJ25ldyBIdHRwJyk7XG5cdH1cblx0cmVxdWVzdChpZCkge1xuXHRcdGNvbnN0IGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuXHRcdGNvbnN0IHBhZ2UgPSBgL3NsaWRlcy9zbGlkZS0ke2lkfS5odG1sYDtcblxuXHRcdCQuZ2V0KHBhZ2UsICggZGF0YSApID0+IGRlZmVyLnJlc29sdmUoZGF0YSkpXG5cdFx0IC5mYWlsKChlKSA9PiBkZWZlci5yZWplY3QoZSkpO1xuXG5cdFx0cmV0dXJuIGRlZmVyO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHA7XG4iLCJjbGFzcyBTdG9yYWdlIHtcblx0Y29uc3RydWN0b3IgKCkge31cblxuXHRzZXRQYWdlKGN1cnJlbnRJZCkge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYWdlJywgY3VycmVudElkKTtcblx0fVxuXG5cdGdldFBhZ2UoKSB7XG5cdFx0cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYWdlJykgfHwgMDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlO1xuIl19
