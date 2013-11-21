/**
 * Presentation модуль
 * @param  {Function} tmpl Функция, которая принимает на вход два параметра.
 * Первый параметр это id шаблона, второй это объект, который будем использовать внутри шаблона
 * @return {Presentation}      Возвращаем конструктор для Presentation
 */
var root = window || {};
root.Presentation = (function(tmpl) {
    var Presentation,
        ui,
        pagingData,
        template;
    Presentation = function (options) {
        this.ui = {
            firstSlideButton    : '.jsToFirstSlide',
            previousSlideButton : '.jsToPreviousSlide',
            nextSlideButton     : '.jsToNextSlide',
            lastSlideButton     : '.jsToLastSlide',

            goToPageInput       : '.jsGoToSlideInput'
        };
        this._pagingData = {
            currentPage: 0,
            totalPages: 0,
            pages: []
        };
        this._activeClass = 'bSlide__eSlideContent__mShown';
        init.call(this,options);
    };

    function init (options) {
        var localOptions,
            presentationRegion,
            dataSlides,
            pagingData,
            self = this;

            pagingData = self._pagingData;

            localOptions = options || {};
            presentationRegion = localOptions.presentationRegion || '.jsPresentation';
            dataSlides = localOptions.dataSlides || [];

            //Предполагаем, что нам всегда приходят однотипные данные, 
            //если нет, то немного расширяем код методом, который обрабатывает входные данные на корректность
            pagingData.currentPage = 0;
            pagingData.totalPages = dataSlides.length;
            pagingData.pages = dataSlides;

            self.$el = $(presentationRegion);
            self.show({slides: dataSlides, pagingData: pagingData});
            
    }

   

    template = tmpl("presentationTemplate");

    Presentation.prototype = {
        show: function (options) {
            var self = this;
            self.$el.html(template(options));
            self.clearEvents();
            self.handleEvents();
        },
        clearEvents: function () {
            var self = this;
            var $el = self.$el;
            var ui = self.ui;

            $el.find(ui.firstSlideButton).off('click');
            $el.find(ui.previousSlideButton).off('click');
            $el.find(ui.nextSlideButton).off('click');
            $el.find(ui.lastSlideButton).off('click');
        },
        handleEvents: function () {
            var self = this;
            var $el = self.$el;
            var pagingData = self._pagingData;
            var ui = self.ui;
            $el.find(ui.firstSlideButton).click(function (e) {
                var currentPageContent;

                e.stopPropagation();
                e.preventDefault();

                currentPageContent = pagingData.pages[pagingData.currentPage];

                if (currentPageContent) {
                    currentPageContent.current = '';
                    pagingData.currentPage = 0;
                    pagingData.pages[pagingData.currentPage].current= self._activeClass;
                    self.show({slides: pagingData.pages, pagingData: pagingData});
                } else {
                    console.log('Ошибка при переключении на первый слайд с ', pagingData.currentPage, 'pagingData', pagingData);
                }
            });
            $el.find(ui.previousSlideButton).click(function (e) {
                var currentPageContent,
                    currentPage = pagingData.currentPage;

                e.preventDefault();
                e.stopPropagation();
                
                currentPageContent = pagingData.pages[pagingData.currentPage];

                if (currentPageContent) {
                    currentPageContent.current = '';
                    pagingData.currentPage = (currentPage > 0) ? currentPage - 1 : 0 ;
                    pagingData.pages[pagingData.currentPage].current= self._activeClass;
                    self.show({slides: pagingData.pages, pagingData: pagingData});
                } else {
                    console.log('Ошибка при переключении на предыдущий слайд с ', pagingData.currentPage, 'pagingData', pagingData);
                }
            });

            $el.find(ui.nextSlideButton).click(function (e) {
                var currentPageContent,
                    currentPage = pagingData.currentPage;
                    
                e.preventDefault();
                e.stopPropagation();
                
                currentPageContent = pagingData.pages[pagingData.currentPage];

                if (currentPageContent) {
                    currentPageContent.current = '';
                    pagingData.currentPage = (currentPage < pagingData.totalPages - 1) ? currentPage + 1 : pagingData.totalPages - 1 ;
                    pagingData.pages[pagingData.currentPage].current= self._activeClass;
                    self.show({slides: pagingData.pages, pagingData: pagingData});
                } else {
                    console.log('Ошибка при переключении на следующий слайд с ', pagingData.currentPage, 'pagingData', pagingData);
                }
            });
            $el.find(ui.lastSlideButton).click(function (e) {
                var currentPageContent;

                e.stopPropagation();
                e.preventDefault();

                currentPageContent = pagingData.pages[pagingData.currentPage];

                if (currentPageContent) {
                    currentPageContent.current = '';
                    pagingData.currentPage = pagingData.totalPages - 1;
                    pagingData.pages[pagingData.currentPage].current= self._activeClass;
                    self.show({slides: pagingData.pages, pagingData: pagingData});
                } else {
                    console.log('Ошибка при переключении на последний слайд с ', pagingData.currentPage, 'pagingData', pagingData);
                }
            });
        }
    };
    console.log('window Presentation', window.Presentation);
    return Presentation;
})(tmpl);