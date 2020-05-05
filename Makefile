start:
	npm run babel-node src/bin/gendiff.js
lint:
	npm run eslint .
publish:
	npm publish --dry-run
npm-publish:
	npm publish
install:
	npm install