install:
	npm ci

build:
    npm run build

test:
    npm run test

test-coverage:
    npm run test:coverage

check:
    npm run lint

lint-fix:
    npm run lint:fix

format:
    npm run format

typecheck:
    npm run typecheck

check: lint typecheck test