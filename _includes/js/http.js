class Http {
	constructor () {
		console.log('new Http');
	}
	request(id) {
		const defer = $.Deferred();
		const page = `/slides/slide-${id}.html`;

		$.get(page, ( data ) => defer.resolve(data))
		 .fail((e) => defer.reject(e));

		return defer;
	}
}

export default Http;
