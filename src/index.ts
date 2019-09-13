import commander from 'commander';
import co from 'co';
import prompt from 'co-prompt';
import getWeather from './getWeather';

const command = commander
  .version('0.2.0')
  .option('-c, --city [name]', 'Input city of chinese name')
  .option('-t, --type [type]', 'Input real-time type')
  .parse(process.argv);

// we 询问形式
if (process.argv.slice(2).length === 0) {
  co(function*() {
    const city = yield prompt('城市名称：');
    const type = yield prompt('天气实时类型：');

    return new Promise(resolve => {
      if (!city || !type) {
        command.outputHelp();
        process.exit();
      }

      resolve({
        city,
        extensions: type,
      });
    }).then(data => {
      getWeather(data);
      process.exit();
    });
  });
}

// we --city 成都 --type base
getWeather({
  city: command.city,
  extensions: command.type,
});
