/*jslint plusplus: true */
/*global $, initSmartObject, SmartObject, dragStart, startRotate, newImageZIndex, workSpace*/

var SmartObject = function (id, content) {
  "use strict";
  this.id = id;
  this.workSpace = workSpace;
  this.draggableWrapper = $("<div/>", {
    "class" : "draggableWrapper"
  }).appendTo(this.workSpace);
  this.wrapper = $("<div/>", {
    "class" : "smartObject light_border"
  }).appendTo(this.draggableWrapper);

  this.content = $("<div/>", {
    "class" : "smartStartContent"
  });

  if (content !== undefined) {
    this.content.remove();
    this.content = $(content).clone();
  }

	this.content.appendTo(this.wrapper);

	if (content !== undefined) {
		hideSmartObject(this);

    content.find("img").load(initSmartObject(this));

  } else {
		initSmartObject(this);
	}
	this.objectCurrentRotation = $(this.wrapper).data('currentRotation');

	this.width = function () {
		return this.objectWidth;
	};
	this.height = function () {
		return this.objectHeight;
	};
	this.currentRotation = function () {
		return this.objectCurrentRotation;
	};

};

function hideSmartObject (smartObject) {
	smartObject.draggableWrapper.hide();
	smartObject.wrapper.hide();
	smartObject.content.hide();
}

function showSmartObject (smartObject) {
	smartObject.draggableWrapper.show();
	smartObject.wrapper.show();
	smartObject.content.show();
}

function initSmartObject(smartObject) {
	"use strict";
	console.log(smartObject.content.prop("tagName") + " width: " + smartObject.content.width());
	// Устанавливаем случайное положение и угол поворота для объекта
	// TODO заменить на загрузку начального положения
	var left = Math.floor(Math.random() * 450 + 100),
		top = Math.floor(Math.random() * 100 + 100),
		angle = Math.floor(Math.random() * 60 - 30);
	$(smartObject.draggableWrapper).css('left', left + 'px');
	$(smartObject.draggableWrapper).css('top', top + 'px');
	$(smartObject.wrapper).css('transform', 'rotate(' + angle + 'deg)');
	$(smartObject.wrapper).css('-moz-transform', 'rotate(' + angle + 'deg)');
	$(smartObject.wrapper).css('-webkit-transform', 'rotate(' + angle + 'deg)');
	$(smartObject.wrapper).css('-o-transform', 'rotate(' + angle + 'deg)');
	$(smartObject.wrapper).data('currentRotation', angle * Math.PI / 180);

	// Делаем объект перемещаемым
	// TODO перенсти на кнопку
	$(smartObject.draggableWrapper).draggable({ containment: 'parent', stack: '.smatrObject', cursor: 'pointer', start: dragStart() });

	// Делаем объект способным вращаться
	$(smartObject.wrapper).mousedown(startRotate);

	// Устанавливаем z-index больше, чем у объектов, уже размещенных на столе
	$(smartObject.wrapper).css('z-index', newImageZIndex++);


	showSmartObject(smartObject);

	smartObject.objectWidth = smartObject.content.width();
	smartObject.objectHeight = smartObject.content.height();
	smartObject.wrapper.width(smartObject.objectWidth);
	smartObject.wrapper.height(smartObject.objectHeight);
	smartObject.content.css('width', '100%');
	smartObject.content.css('height', '100%');
	if (smartObject.content.get(0).complete) {
		$(smartObject.content).trigger("load");
	}


}

/*function initSmartObject(wrapper, draggableWrapper) {
	"use strict";
	// Устанавливаем случайное положение и угол поворота для объекта
	// TODO заменить на загрузку начального положения
	var left = Math.floor(Math.random() * 450 + 100),
		top = Math.floor(Math.random() * 100 + 100),
		angle = Math.floor(Math.random() * 60 - 30);
	$(draggableWrapper).css('left', left + 'px');
	$(draggableWrapper).css('top', top + 'px');
	$(wrapper).css('transform', 'rotate(' + angle + 'deg)');
	$(wrapper).css('-moz-transform', 'rotate(' + angle + 'deg)');
	$(wrapper).css('-webkit-transform', 'rotate(' + angle + 'deg)');
	$(wrapper).css('-o-transform', 'rotate(' + angle + 'deg)');
	$(wrapper).data('currentRotation', angle * Math.PI / 180);

	// Делаем объект перемещаемым
	// TODO перенсти на кнопку
	$(draggableWrapper).draggable({ containment: 'parent', stack: '.smatrObject', cursor: 'pointer', start: dragStart() });

	// Делаем объект способным вращаться
	$(wrapper).mousedown(startRotate);

	// Устанавливаем z-index больше, чем у объектов, уже размещенных на столе
	$(wrapper).css('z-index', newImageZIndex++);
}*/
