#!/usr/bin/env node
var argv = [];
for (var i = 2, len = process.argv.length; i < len; i++) {
    if (/^-/.test(process.argv[i])) {
        break;
    }
    argv.push(process.argv[i]);
}
if (!argv.length) {
    return;
}
var grep = require('..');
var pat = argv.pop();
grep(pat, argv);
