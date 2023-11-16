MAKEFLAGS:= -rR

run: all
	node lib/run.js

ts:= $(wildcard src/*.ts)
js:= $(patsubst src/%.ts,lib/%.js,$(js))

$(js): $(ts)
	tsc

all: $(js)
	rm -fr lib
	mkdir -p lib 
	tsc
	chmod -w lib/*.js



