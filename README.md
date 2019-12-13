# json-schema-sensitivity-checker

[![npm
version](https://badge.fury.io/js/json-schema-sensitivity-checker.svg)](https://badge.fury.io/js/json-schema-sensitivity-checker)
![ci status](https://github.com/cbetta/json-schema-sensitivity-checker/workflows/Node%20CI/badge.svg)

This CLI allows you to provide a JSONPath expression and run
[`alex`](https://alexjs.com) against any matching lines.

> This tool is currently in alpha and has primarily been tested against OpenAPI
> files. PRs are welcome!

This project is very much inspired by and based on the work done on the
[`json-schema-spell-checker`](https://github.com/mheap/json-schema-spell-checker)
by Michael Heap.

## Installation

```bash
npm install -g json-schema-sensitivity-checker
```

## Usage

Check against specific field names at any depth:

```bash
json-schema-sensitivity-checker -f 'description,title' path/to/openapi.json
```

Alternatively, you can specify a JSONPath expression yourself.

```bash
json-schema-sensitivity-checker -j '$..["description","title"]' path/to/openapi.json
```

## Options

```bash
Usage: bin [options] source-file

Options:
  -V, --version           output the version number
  -t, --text              treat input as plain-text (not markdown)
  -l, --html              treat input as html (not markdown)
  -d, --diff              ignore unchanged lines (affects Travis only)
  -j, --json-path [path]  specify a jsonpath expression to match
  -c, --config [path]     specify a JSON formatted Alex config to pass to every match
  -f, --fields [fields]   specify a comma separated l
```
