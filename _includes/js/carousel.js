import Http from './http';

const $select = {
	ele: '.bd-carousel',
	prev: '.bd-prev',
	next: '.bd-next',
};

class Carousel {
	constructor() {
		this.currentId = 0;
		this.http = new Http();

		this.ele = $($select.ele).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			arrows: false
		});

		$($select.next).on('click', () => this.nextPage());
		$($select.prev).on('click', () => this.prevPage());

		this.ele.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
			console.log(currentSlide + ':' + nextSlide);
		});

		this.nextPage();
	}

	prevPage() {
		if (this.currentId > 2){
			setTimeout(() => {
				this.ele.slick('slickRemove', this.currentId)
			}, 500);
			this.currentId--;
		}

		this.ele.slick('slickPrev');
	}

	nextPage(event) {
		this.currentId++;

		this.http.request(this.currentId)
			.then((page)=> {
				this.ele.slick('slickAdd', page);
				setTimeout(() => {
					this.ele.slick('slickNext')
				}, 200);
			}).fail(() => {
				this.currentId--;
				console.warn('bd-pharma:: there is not page to load!');
			});
	}
}

// `
// 	<div>
// 		<div class="page-slide bg-red">
// 			<img data-lazy="http://placehold.it/350x150?text=Slide+${this.currentId}" />
// 		</div>
// 	</div>
// `

export default Carousel;
