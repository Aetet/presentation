$(document).ready(function () {
    //Небольшой рассказ на тему бытия разработчиком на новом проекте до первого релиза
    var slides = [{
        image: 'images/slides/namelessone.jpg',
        current: 'bSlide__eSlideContent__mShown'
    }, {
        image: 'images/slides/jayandbob.jpg',
        current: ''
    }, {
        image: 'images/slides/arma.jpg',
        current: ''
    }, {
        image: 'images/slides/Fallout2Perks.jpg',
        current: ''
    }, {
        image: 'images/slides/StarWars.jpg',
        current: ''
    }, {
        image: 'images/slides/worldEnd.jpg',
        current: ''
    }, {
        image: 'images/slides/levelup.jpg',
        current: ''
    }];
    var presentation = new Presentation({dataSlides: slides});

    var presentation2 = new Presentation({presentationRegion: '.jsPresentation2'});

});