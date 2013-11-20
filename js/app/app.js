$(document).ready(function () {
    //Небольшой рассказ на тему бытия разработчиком на новом проекте до первого релиза
    var slides = [{
        image: 'images/namelessone.jpg'
    }, {
        image: 'images/jayandbob.jpg'
    }, {
        image: 'images/arma.jpg'
    }, {
        image: 'images/Fallout2Perks.jpg'
    }, {
        image: 'images/StarWars.jpg'
    }, {
        image: 'images/worldEnd.jpg'
    }];
    var presentation = new Presentation({dataSlides: slides});

    var presentation2 = new Presentation({presentationRegion: '.jsPresentation2', dataSlides: slides});

});