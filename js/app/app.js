$(document).ready(function () {
    //Небольшой рассказ на тему бытия разработчиком на новом проекте до первого релиза
    var slides = [{
        image: 'images/namelessone.jpg',
        current: 'bSlide__eSlideContent__mShown'
    }, {
        image: 'images/jayandbob.jpg',
        current: ''
    }, {
        image: 'images/arma.jpg',
        current: ''
    }, {
        image: 'images/Fallout2Perks.jpg',
        current: ''
    }, {
        image: 'images/StarWars.jpg',
        current: ''
    }, {
        image: 'images/worldEnd.jpg',
        current: ''
    }];
    var presentation = new Presentation({dataSlides: slides});

    var presentation2 = new Presentation({presentationRegion: '.jsPresentation2'});

});