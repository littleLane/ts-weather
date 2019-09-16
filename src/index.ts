import inquirer from 'inquirer';
import commander from 'commander';
import colors from 'colors';
import packageConfig from '../package.json';
import getWeather from './getWeather';

// we 询问形式
if (process.argv.slice(2).length === 0) {
  const promptList = [
    {
      type: 'input',
      message: 'Input city of chinese name',
      name: 'city',
      default: undefined,
    },
    {
      type: 'list',
      message: 'Input real-time type',
      name: 'extensions',
      choices: [
        {
          key: 'all',
          name: 'all',
          value: 'all',
        },
        {
          key: 'base',
          name: 'base',
          value: 'base',
        },
      ],
    },
  ];

  inquirer.prompt(promptList).then(answers => {
    getWeather(answers);
  });
} else {
  // we --city 成都 --type base
  const command = commander
    .allowUnknownOption()
    .version(packageConfig.version)
    .option('-c, --city [name]', 'Input city of chinese name')
    .option('-t, --type [type]', 'Input real-time type')
    .parse(process.argv);

  if (!command.city) {
    console.error('There are two ways to play:');
    console.log();
    console.log('Example:');
    console.log(`    ${colors.cyan(command.name())}`);
    console.log(`  ${colors.yellow('OR')}`);
    console.log(`    ${colors.cyan(command.name())} ${colors.green('--city [cityName] --type [type]')}`);
    console.log();
    command.outputHelp();
    process.exit();
  }

  getWeather({
    city: command.city,
    extensions: command.type,
  });
}
