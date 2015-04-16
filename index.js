#!/usr/bin/env node

require('shelljs/global');
var program = require('commander');

var commands = [
  'open -a "Google Chrome"',
  'open -a Safari',
  'open -a Firefox',
  'node_modules/.bin/iectrl open -s Win7'
];

if (process.platform !== 'darwin') {
  echo('This command is only supported on OSX');
  exit(1);
}

program
  .usage('[options] <url>')
  .description('Opens a URL in a specified browser or all browsers.')
  .option('-s, --safari', 'Open URL in Safari')
  .option('-f, --firefox', 'Open URL in Firefox')
  .option('-c, --chrome', 'Open URL in Google Chrome')
  .option('-w, --win', 'Open URL in all Win7 VMs');

program.command('close')
  .alias('x')
  .description('Closes all open VMs.')
  .action(function(){
    exec('node_modules/.bin/iectrl close');
    exec('node_modules/.bin/iectrl stop');
    exit(0);
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
  exit(0);
}

if (program.chrome) {
  exec(commands[0] + ' ' + program.args[0]);
  exit(0);
}

if (program.safari) {
  exec(commands[1] + ' ' + program.args[0]);
  exit(0);
}

if (program.firefox) {
  exec(commands[2] + ' ' + program.args[0]);
  exit(0);
}

if (program.win) {
  exec(commands[3] + ' ' + program.args[0]);
  exit(0);
}

commands.map(function(cmd) {
  exec(cmd + ' ' + program.args[0]);
});
