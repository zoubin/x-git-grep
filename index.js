var filter = require('array-promise-filter');
var promisify = require('node-promisify');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var noop = function () {};

module.exports = function (pat, dirs) {
    dirs = [].concat.apply([], dirs).map(function (dir) {
        return path.resolve(dir);
    });
    return filter(dirs, promisify(isDirectory))
        .then(function (dirs) {
            dirs.forEach(function (dir) {
                gitgrep(pat, dir);
            });
        })
        .catch(noop)
        ;
};

function isDirectory(file, cb) {
    fs.stat(file, function (err, stats) {
        err = err || stats.isDirectory() && null;
        cb(err, file);
    });
}

function gitgrep(pat, dir) {
    exec('cd ' + dir + ' && git grep ' + pat, function (err, out) {
        if (out) {
            console.log('='.repeat(80));
            console.log(dir);
            console.log('-'.repeat(80));
            console.log(out);
        }
    });
}

