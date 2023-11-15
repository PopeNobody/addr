all:
	test -e node_modules || npm install
	tsc
	vi-node dst/run.js
	vi-node src/old.js
