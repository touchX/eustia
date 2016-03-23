var async = require('async'),
    _ = require('../lib/util');

var searchRepo = require('./install/searchRepo'),
    downloadFile = require('./install/downloadFile');

function exports(options, cb)
{
    if (options.modules.length === 0)
    {
        _.log.warn('You need to specify at least one module name.');
        return cb();
    }

    async.waterfall([
        function (cb) { searchRepo(options, cb) },
        function (installRepos, cb) { downloadFile(installRepos, options, cb) }
    ], function (err)
    {
        if (err) return cb(err);

        cb();
    });
}

exports.defOpts = {
    modules: []
};

module.exports = exports;