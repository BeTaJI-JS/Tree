Задача:
Сделать дерево с навигацией как в проводнике vs code

Мнимое апи (которого не существует) должно возвращать и работать с данными в следующем формате:
const data: <Array<Node>>;

type Node = {
id: string;
name: string;
type: 'file' | 'folder'
children?: Array<Node>;
}

Функциональные требования:

1. Сделать дерево (данные хранить в localStorage)
2. Сделать возможность "активировать" элемент ("выделить" при клике)
3. Управление данными (кнопки):
   -Добавить элемент (элемент = файл/папка, и то и то)
   -Удалить элемент (и все вложенные)
   -Переименовать элемент
   -При фокусе файла - элемент добавляется в корень, при фокусе папки - элемент добавляется в выбранную папку
4. Сделать возможность открыть/закрыть каждый пункт (по дефолту все пункты закрыты)
5. Сделать привязку к url
   Возможность поделиться ссылкой
   Возможность перезагрузить страницу без потери открытого элемента (выбранного)
6. Название элементов может быть в 2 и более строк, предусмотреть этот и подобные моменты
7. Показывать путь к элементу при выборе элемента (хлебные крошки в хедере)
8. Дизайн:
   Дизайн по макету (https://www.figma.com/design/vjME5ZlZSg1yo5CcvkgcU9/%D0%9F%D0%B5%D1%82-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BE?node-id=0-1&t=aI2DzlbPtiHrKGrK-1)
   Адаптив всей страницы по ширине и высоте в зависимости от размеров экрана
   Блок с деревом всегда 500px
   Адаптив блока с деревом по высоте в зависимости от размеров экрана
   Адаптив без JavaScript

Требования к коду:

1. Typescript (без any)
2. Настроить линтер (любой версии)
3. Залить демо куда-нибудь
4. Без модалок, модалки - зло
5. Без излишнего количества библиотек, В идеале вообще ничего не использовать, кроме реакта, дев библиотек для сборки и линтера (мб еще библиотека для стилей),
