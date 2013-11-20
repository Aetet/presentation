/**
 * Presentation модуль
 * @param  {Function} tmpl Функция, которая принимает на вход два параметра.
 * Первый параметр это id шаблона, второй это объект, который будем использовать внутри шаблона
 * @return {Presentation}      Возвращаем конструктор для Presentation
 */
(function(tmpl) {
    var root = window;//root может быть чем угодно, однако мы берем самый простой случай
    var Presentation = function (options) {
        this.init(options);
    };

    Presentation.prototype = {
        init: function (options) {
            var localOptions = options || {};
            var presentationRegion = localOptions.presentationRegion || '.jsPresentation';
            var dataSlides = localOptions.dataSlides;
            $(presentationRegion).html(tmpl("presentationTemplate", {slides: dataSlides}));
        }
    };

    root.Presentation = Presentation;
    return Presentation;
})(tmpl);