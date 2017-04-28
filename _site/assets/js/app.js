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

		this.currentId = 0;
		this.http = new _http2.default();

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

		this.ele.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			console.log(currentSlide + ':' + nextSlide);
		});

		this.nextPage();
	}

	_createClass(Carousel, [{
		key: 'prevPage',
		value: function prevPage() {
			var _this2 = this;

			if (this.currentId > 2) {
				setTimeout(function () {
					_this2.ele.slick('slickRemove', _this2.currentId);
				}, 500);
				this.currentId--;
			}

			this.ele.slick('slickPrev');
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

},{"./http":3}],3:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfaW5jbHVkZXMvanMvYXBwLmpzIiwiX2luY2x1ZGVzL2pzL2Nhcm91c2VsLmpzIiwiX2luY2x1ZGVzL2pzL2h0dHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7Ozs7QUFFQTtBQUNBLEVBQUUsWUFBTTtBQUNQO0FBQ0EsQ0FGRCxFLENBSkE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7O0FBRUEsSUFBTSxVQUFVO0FBQ2YsTUFBSyxjQURVO0FBRWYsT0FBTSxVQUZTO0FBR2YsT0FBTTtBQUhTLENBQWhCOztJQU1NLFE7QUFDTCxxQkFBYztBQUFBOztBQUFBOztBQUNiLE9BQUssU0FBTCxHQUFpQixDQUFqQjtBQUNBLE9BQUssSUFBTCxHQUFZLG9CQUFaOztBQUVBLE9BQUssR0FBTCxHQUFXLEVBQUUsUUFBUSxHQUFWLEVBQWUsS0FBZixDQUFxQjtBQUMvQixpQkFBYyxDQURpQjtBQUUvQixtQkFBZ0IsQ0FGZTtBQUcvQixhQUFVLEtBSHFCO0FBSS9CLFdBQVE7QUFKdUIsR0FBckIsQ0FBWDs7QUFPQSxJQUFFLFFBQVEsSUFBVixFQUFnQixFQUFoQixDQUFtQixPQUFuQixFQUE0QjtBQUFBLFVBQU0sTUFBSyxRQUFMLEVBQU47QUFBQSxHQUE1QjtBQUNBLElBQUUsUUFBUSxJQUFWLEVBQWdCLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCO0FBQUEsVUFBTSxNQUFLLFFBQUwsRUFBTjtBQUFBLEdBQTVCOztBQUVBLE9BQUssR0FBTCxDQUFTLEVBQVQsQ0FBWSxjQUFaLEVBQTRCLFVBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxZQUFmLEVBQTZCLFNBQTdCLEVBQTJDO0FBQ3RFLFdBQVEsR0FBUixDQUFZLGVBQWUsR0FBZixHQUFxQixTQUFqQztBQUNBLEdBRkQ7O0FBSUEsT0FBSyxRQUFMO0FBQ0E7Ozs7NkJBRVU7QUFBQTs7QUFDVixPQUFJLEtBQUssU0FBTCxHQUFpQixDQUFyQixFQUF1QjtBQUN0QixlQUFXLFlBQU07QUFDaEIsWUFBSyxHQUFMLENBQVMsS0FBVCxDQUFlLGFBQWYsRUFBOEIsT0FBSyxTQUFuQztBQUNBLEtBRkQsRUFFRyxHQUZIO0FBR0EsU0FBSyxTQUFMO0FBQ0E7O0FBRUQsUUFBSyxHQUFMLENBQVMsS0FBVCxDQUFlLFdBQWY7QUFDQTs7OzJCQUVRLEssRUFBTztBQUFBOztBQUNmLFFBQUssU0FBTDs7QUFFQSxRQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLEtBQUssU0FBdkIsRUFDRSxJQURGLENBQ08sVUFBQyxJQUFELEVBQVM7QUFDZCxXQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsVUFBZixFQUEyQixJQUEzQjtBQUNBLGVBQVcsWUFBTTtBQUNoQixZQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsV0FBZjtBQUNBLEtBRkQsRUFFRyxHQUZIO0FBR0EsSUFORixFQU1JLElBTkosQ0FNUyxZQUFNO0FBQ2IsV0FBSyxTQUFMO0FBQ0EsWUFBUSxJQUFSLENBQWEsd0NBQWI7QUFDQSxJQVRGO0FBVUE7Ozs7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztrQkFFZSxROzs7Ozs7Ozs7Ozs7O0lDakVULEk7QUFDTCxpQkFBZTtBQUFBOztBQUNkLFVBQVEsR0FBUixDQUFZLFVBQVo7QUFDQTs7OzswQkFDTyxFLEVBQUk7QUFDWCxPQUFNLFFBQVEsRUFBRSxRQUFGLEVBQWQ7QUFDQSxPQUFNLDBCQUF3QixFQUF4QixVQUFOOztBQUVBLEtBQUUsR0FBRixDQUFNLElBQU4sRUFBWSxVQUFFLElBQUY7QUFBQSxXQUFZLE1BQU0sT0FBTixDQUFjLElBQWQsQ0FBWjtBQUFBLElBQVosRUFDRSxJQURGLENBQ08sVUFBQyxDQUFEO0FBQUEsV0FBTyxNQUFNLE1BQU4sQ0FBYSxDQUFiLENBQVA7QUFBQSxJQURQOztBQUdBLFVBQU8sS0FBUDtBQUNBOzs7Ozs7a0JBR2EsSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBpbXBvcnRzXG5pbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnLi9jYXJvdXNlbCc7XG5cbi8vIEluaXQgYXBwIGZ1bmNpb25hbGl0eVxuJCgoKSA9PiB7XG5cdG5ldyBDYXJvdXNlbCgpO1xufSk7XG4iLCJpbXBvcnQgSHR0cCBmcm9tICcuL2h0dHAnO1xuXG5jb25zdCAkc2VsZWN0ID0ge1xuXHRlbGU6ICcuYmQtY2Fyb3VzZWwnLFxuXHRwcmV2OiAnLmJkLXByZXYnLFxuXHRuZXh0OiAnLmJkLW5leHQnLFxufTtcblxuY2xhc3MgQ2Fyb3VzZWwge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmN1cnJlbnRJZCA9IDA7XG5cdFx0dGhpcy5odHRwID0gbmV3IEh0dHAoKTtcblxuXHRcdHRoaXMuZWxlID0gJCgkc2VsZWN0LmVsZSkuc2xpY2soe1xuXHRcdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXG5cdFx0XHRpbmZpbml0ZTogZmFsc2UsXG5cdFx0XHRhcnJvd3M6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHQkKCRzZWxlY3QubmV4dCkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5uZXh0UGFnZSgpKTtcblx0XHQkKCRzZWxlY3QucHJldikub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5wcmV2UGFnZSgpKTtcblxuXHRcdHRoaXMuZWxlLm9uKCdiZWZvcmVDaGFuZ2UnLCAoZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUsIG5leHRTbGlkZSkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coY3VycmVudFNsaWRlICsgJzonICsgbmV4dFNsaWRlKTtcblx0XHR9KTtcblxuXHRcdHRoaXMubmV4dFBhZ2UoKTtcblx0fVxuXG5cdHByZXZQYWdlKCkge1xuXHRcdGlmICh0aGlzLmN1cnJlbnRJZCA+IDIpe1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuZWxlLnNsaWNrKCdzbGlja1JlbW92ZScsIHRoaXMuY3VycmVudElkKVxuXHRcdFx0fSwgNTAwKTtcblx0XHRcdHRoaXMuY3VycmVudElkLS07XG5cdFx0fVxuXG5cdFx0dGhpcy5lbGUuc2xpY2soJ3NsaWNrUHJldicpO1xuXHR9XG5cblx0bmV4dFBhZ2UoZXZlbnQpIHtcblx0XHR0aGlzLmN1cnJlbnRJZCsrO1xuXG5cdFx0dGhpcy5odHRwLnJlcXVlc3QodGhpcy5jdXJyZW50SWQpXG5cdFx0XHQudGhlbigocGFnZSk9PiB7XG5cdFx0XHRcdHRoaXMuZWxlLnNsaWNrKCdzbGlja0FkZCcsIHBhZ2UpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmVsZS5zbGljaygnc2xpY2tOZXh0Jylcblx0XHRcdFx0fSwgMjAwKTtcblx0XHRcdH0pLmZhaWwoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmN1cnJlbnRJZC0tO1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ2JkLXBoYXJtYTo6IHRoZXJlIGlzIG5vdCBwYWdlIHRvIGxvYWQhJyk7XG5cdFx0XHR9KTtcblx0fVxufVxuXG4vLyBgXG4vLyBcdDxkaXY+XG4vLyBcdFx0PGRpdiBjbGFzcz1cInBhZ2Utc2xpZGUgYmctcmVkXCI+XG4vLyBcdFx0XHQ8aW1nIGRhdGEtbGF6eT1cImh0dHA6Ly9wbGFjZWhvbGQuaXQvMzUweDE1MD90ZXh0PVNsaWRlKyR7dGhpcy5jdXJyZW50SWR9XCIgLz5cbi8vIFx0XHQ8L2Rpdj5cbi8vIFx0PC9kaXY+XG4vLyBgXG5cbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsO1xuIiwiY2xhc3MgSHR0cCB7XG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRjb25zb2xlLmxvZygnbmV3IEh0dHAnKTtcblx0fVxuXHRyZXF1ZXN0KGlkKSB7XG5cdFx0Y29uc3QgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG5cdFx0Y29uc3QgcGFnZSA9IGAvc2xpZGVzL3NsaWRlLSR7aWR9Lmh0bWxgO1xuXG5cdFx0JC5nZXQocGFnZSwgKCBkYXRhICkgPT4gZGVmZXIucmVzb2x2ZShkYXRhKSlcblx0XHQgLmZhaWwoKGUpID0+IGRlZmVyLnJlamVjdChlKSk7XG5cblx0XHRyZXR1cm4gZGVmZXI7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHR0cDtcbiJdfQ==
