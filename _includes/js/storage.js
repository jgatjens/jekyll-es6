class Storage {
	constructor () {}

	setPage(currentId) {
		localStorage.setItem('page', currentId);
	}

	getPage() {
		return localStorage.getItem('page') || 0;
	}
}

export default Storage;
