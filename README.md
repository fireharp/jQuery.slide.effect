jQuery.slide.effect
===================

Что это?
--------

Этот jQuery-плагин позволяет использовать у себя на странице эффект перелистывания.

Пример использования
---------------------------------

`(‘#slider’).slideEffect(‘ajax_respond_url’,N);`

Эффект будет применен к элементу с id=”slider”. Первый аргумент – адрес обработчика ajax-запросов, второй – общее количество страниц.

По адресу обработчика плагин посылает запросы вида  `‘ajax_respond_url?p=k’`. Где `k` – запрашиваемая страница, `0≤k<N`. 
Предполагается, что сервер вернет готовый HTML для размещения в слайде.

Опция пока всего одна: высота элемента, к которому будет применен эффект.

`$(‘#slider’).slideEffect(‘ajax_respond_url’,5,{height:600});`

Высота элемента будет явно установлена в 600px.

Создатель
---------

&copy; 2010 Андрей Мокроусов

About
------

This jQuery-plugins helps you to use slide effect on your page.

Usage
---------

`(‘#slider’).slideEffect(‘ajax_respond_url’,N);`
Now element with id=”slider” will have slide effect. First parameter is url of ajax handler. Second is for number of slides.

Ajax handler takes requests like `‘ajax_respond_url?p=k’`. Where `k` is slide number, `0≤k<N`.
Response is considered to be HTML that's ready to be placed into the page.

There's only one option so far. Height of element with slide effect. 

`$(‘#slider’).slideEffect(‘ajax_respond_url’,5,{height:600});`

In the examle above height will be set to 600px.

Copyright
----------

&copy; 2010 Andrey Mokrousov