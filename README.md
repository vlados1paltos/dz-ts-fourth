# dz-ts-fourth

Домашнее задание по теме «Использование TypeScript с современными фреймворками и библиотеками».

## Что сделано

- форма регистрации на React + TypeScript;
- поля Login, Email и Password;
- валидация через `simple-react-validator`;
- кнопка Register заблокирована, пока данные некорректны;
- после успешной отправки появляется сообщение;
- отдельная API-заглушка `registerUser`;
- ссылка Register в Header;
- маршрут `/register`;
- snapshot-тест;
- тесты валидации и отправки формы.

## Запуск

```bash
npm install
npm start
```

## Тесты

```bash
npm test
```

Для однократного запуска тестов:

```bash
npm test -- --watchAll=false
```

## GitHub Pages

Проект уже подготовлен к публикации через `gh-pages`.

```bash
npm run deploy
```

После публикации приложение будет доступно по адресу:

https://vlados1paltos.github.io/dz-ts-fourth/
