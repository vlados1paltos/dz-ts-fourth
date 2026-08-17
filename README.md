# dz-ts-fourth

Домашнее задание по теме «Использование TypeScript с современными фреймворками и библиотеками».

## Что сделано

- форма регистрации на React + TypeScript;
- поля Login, Email и Password;
- валидация через `simple-react-validator`;
- кнопка Register заблокирована, пока данные некорректны;
- ссылка Register в Header;
- маршрут `/register`;
- отправка регистрационных данных через `fetch` POST-запросом на тестовый REST API;
- обработка неуспешного ответа API;
- snapshot-тест;
- тесты валидации и отправки формы;
- в тестах добавлены поясняющие комментарии к проверяемым сценариям;
- `fetch` в тестах подменяется mock-функцией, чтобы тесты не зависели от интернета.

## Запуск

```bash
npm install
npm start
```

## Тесты

```bash
npm test
```

Для однократного запуска:

```bash
npm test -- --watchAll=false
```

## GitHub Pages

```bash
npm run deploy
```

Рабочая версия:

https://vlados1paltos.github.io/dz-ts-fourth/
