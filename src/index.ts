
import colors from 'colors';
import commander from 'commander';
import getWeather from './getWeather';

const command = commander
    .version('0.1.0')
    .option('-c, --city [name]', 'Add city name')
    .parse(process.argv);

if (process.argv.slice(2).length === 0) {
    command.outputHelp(colors.red);
    process.exit();
}

getWeather(command.city);

