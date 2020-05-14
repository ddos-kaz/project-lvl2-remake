#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .description('Compares 2 configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output Format')
  .arguments('<firstConf> <secondConf>')
  .action((firstConf, secondConf) => console.log(genDiff(firstConf, secondConf, program.format)));

program.parse(process.arg);
