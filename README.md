# json-schema-sensitivity-checker

This CLI allows you to provide a JSONPath expression and run [`alex`] against any matching lines.

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
  -f, --fields [fields]   specify a comma separated list of field names to match
  -h, --help              output usage information
```
