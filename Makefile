MAKEFLAGS:= -rR

run: all
	node lib/run.js

ts:= $(wildcard src/*.ts)
js:= $(patsubst src/%.ts,lib/%.js,$(ts))

$(js): $(ts)
	rm -fr lib
	mkdir -p lib 
	tsc

all: $(js)
	chmod -w lib/*.js



