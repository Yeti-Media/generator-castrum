/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('castrum generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('castrum:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            'app/styles/castrum/_castrum-grid.scss',
            'app/styles/castrum/_mixins.scss',
            'app/styles/castrum/_state.scss',
            'app/styles/castrum/_variables.scss',
            'app/styles/castrum/castrum.scss'
        ];

        helpers.mockPrompt(this.app, {
            'castrum': true
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
