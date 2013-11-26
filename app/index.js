'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var CastrumGenerator = module.exports = function CastrumGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CastrumGenerator, yeoman.generators.Base);

CastrumGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'castrum',
    message: 'Would you like to enable the Castrum responsive grid?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.castrum = props.castrum;

    cb();
  }.bind(this));
};

CastrumGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/styles/castrum');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

CastrumGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('castrum/_castrum-grid.scss', 'app/styles/castrum/_castrum-grid.scss');
  this.copy('castrum/_mixins.scss', 'app/styles/castrum/_mixins.scss');
  this.copy('castrum/_state.scss', 'app/styles/castrum/_state.scss');
  this.copy('castrum/_variables.scss', 'app/styles/castrum/_variables.scss');
  this.copy('castrum/castrum.scss', 'app/styles/castrum/castrum.scss');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
