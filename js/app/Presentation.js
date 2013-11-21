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

            self.firstShow = true;

            self.$el = $(presentationRegion);
            self.show({slides: dataSlides, pagingData: pagingData});
            
    }

   

    template = tmpl("presentationTemplate");

    function changeAspectRatio() {
        var self = this;
        var slideContent = self.$el.find('.bSlide__eSlideContent.' + self._activeClass);
        var slideContentWidth = slideContent.width();
        var slideContentHeight = slideContent.height();
        slideContent.find('img').each(function () {
            var imgWidth = $(this).width();
            var imgHeight = $(this).height();
            var imgClass;
            if ((imgWidth < slideContentWidth) && (imgHeight < slideContentHeight)) {
                imgClass = 'bSlide__eImage__mTooSmall';
            } else if (imgWidth < slideContentWidth) {
                imgClass = 'bSlide__eImage__mWidthTooSmall';
            } else if (imgHeight < slideContentHeight) {
                imgClass = 'bSlide__eImage__mHeightTooSmall';
            } else {
                imgClass = '';
            }
//            var imgClass = ($(this).width() / $(this).height() > 1) ? 'bSlide__eImage__mWide' : 'bSlide__eImage__mTall';
            $(this).addClass(imgClass);
        });
    }

    Presentation.prototype = {
        show: function (options) {
            var self = this;
            var html = template(options);
            self.$el.html(html);

            //Страшный грязный хак. При первой загрузке у картинки 0 0 высота и ширина. Поэтому не может правильно определить высоту и ширину TODO Fix this
            if (self.firstShow) {
                setTimeout(function () {
                    changeAspectRatio.call(self);
                    self.firstShow = false;
                }, 35);
            } else {
                changeAspectRatio.call(self);
            }
            
            self.clearEvents();
            self.handleEvents();

            //Небольшой хак для нормального отображения картинок разного разрешения
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
                    if (currentPage > 0) {
                        pagingData.currentPage = currentPage - 1;
                        pagingData.pages[pagingData.currentPage].current= self._activeClass;
                        self.show({slides: pagingData.pages, pagingData: pagingData});
                    }
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
                    if (currentPage < pagingData.totalPages - 1) {
                        pagingData.currentPage = currentPage + 1;
                        pagingData.pages[pagingData.currentPage].current= self._activeClass;
                        self.show({slides: pagingData.pages, pagingData: pagingData});
                    }
                    
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

            $el.find(ui.goToPageInput).keydown(function (e) {
                var currentPageContent;
                var target = e.currentTarget;
                console.log('target', target);

                if (e.keyCode === 13) {
                    var slideNumber = +target.value - 1;
                    console.log('slideNumber', slideNumber);

                    if (slideNumber >= 0 && slideNumber <= pagingData.totalPages) {
                        currentPageContent = pagingData.pages[pagingData.currentPage];
                        if (currentPageContent) {
                            currentPageContent.current = '';
                            pagingData.currentPage = slideNumber;
                            pagingData.pages[slideNumber].current= self._activeClass;
                            console.log('pagingData', JSON.stringify(pagingData));
                            self.show({slides: pagingData.pages, pagingData: pagingData});
                        } else {
                            console.log('Ошибка при переключении на последний слайд с ', pagingData.currentPage, 'pagingData', pagingData);
                        }
                    } else {
                        alert('Старые добрые стариковские уведомления о неправильной работе приложения');
                    }
                }
            });
        }
    };
    console.log('window Presentation', window.Presentation);
    return Presentation;
})(tmpl);