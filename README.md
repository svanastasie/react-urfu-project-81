# Генератор форм на Typescript

[![CI](https://github.com/svanastasie/react-urfu-project-81/actions/workflows/ci.yml/badge.svg)](https://github.com/svanastasie/react-urfu-project-81/actions/workflows/ci.yml)

[![hexlet-check](https://github.com/svanastasie/react-urfu-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/svanastasie/react-urfu-project-81/actions)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=svanastasie_react-urfu-project-81&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=svanastasie_react-urfu-project-81)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=svanastasie_react-urfu-project-81&metric=coverage)](https://sonarcloud.io/summary/new_code?id=svanastasie_react-urfu-project-81)

Библиотека, с помощью которой удобно создавать формы в шаблонах сайтов. Она заметно сокращает код описания формы за счет автоматической обработки ошибок и различных контролов.

Учебный проект Хекслета: https://ru.hexlet.io/

## Стек

- TypeScript

## Установка

```bash
git clone https://github.com/svanastasie/react-urfu-project-81.git
cd react-urfu-project-81
make install
```

## Использование

```ts
import HexletCode from '@hexlet/code';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };

HexletCode.formFor(template, {}, () => {});
// <form method="post" action="#"></form>

HexletCode.formFor(template, { url: '/users' }, () => {});
// <form method="post" action="/users"></form>
```

### Поля формы

Метод `input(name, attributes)` добавляет поле, значение которого берётся из шаблона, и подпись `<label>` к нему. Опция `as: 'textarea'` создаёт `<textarea>`, остальные атрибуты добавляются к тегу или переопределяют значения по умолчанию. Метод `submit(text)` добавляет кнопку отправки, по умолчанию с текстом `Save`.

```ts
const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
    f.input('name', { class: 'user-input' });
    f.input('job', { as: 'textarea', rows: 50 });
    f.submit('Wow');
});

// <form method="post" action="#">
//   <label for="name">Name</label>
//   <input name="name" type="text" value="rob" class="user-input">
//   <label for="job">Job</label>
//   <textarea cols="20" rows="50" name="job">hexlet</textarea>
//   <input type="submit" value="Wow">
// </form>
```

Если поля нет в шаблоне, будет выброшена ошибка:

```ts
HexletCode.formFor(template, {}, (f) => f.input('age'));
// Error: Field 'age' does not exist in the template.
```

## Устройство

Форма хранится как структура данных, отдельно от HTML:

1. `FormBuilder` (`f` в коллбэке) собирает список полей: `{ kind: 'input', name, label, value, attributes }` и `{ kind: 'submit', value }`.
2. `renderForm` превращает эту структуру в HTML через `Tag`.

Чтобы вывести форму иначе (шаблонизатор, Bootstrap, JSON), достаточно написать другую функцию вместо `renderForm`: билдер менять не нужно.

## Разработка

| Команда              | Действие                            |
| -------------------- | ----------------------------------- |
| `make test`          | запустить тесты                     |
| `make test-coverage` | тесты с отчётом о покрытии          |
| `make lint`          | проверить код ESLint                |
| `make typecheck`     | проверить типы                      |
| `make check`         | линтер, типы и тесты одной командой |
| `make build`         | собрать библиотеку в `dist/`        |

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
