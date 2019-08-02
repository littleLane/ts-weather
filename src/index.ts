import axios, { AxiosResponse } from 'axios';
import colors from 'colors';
import commander from 'commander';
import { ILive, IWeatherResponse } from './types';

// tslint:disable-next-line: no-console
const log = console.log;

const command = commander
    .version('0.1.0')
    .option('-c, --city [name]', 'Add city name')
    .parse(process.argv);

if (process.argv.slice(2).length === 0) {
    command.outputHelp(colors.red);
    process.exit();
}

const URL = 'http://restapi.amap.com/v3/weather/weatherInfo';
const KEY = '5bf40bae03f0adf4f80b6c3b5dde89ad';

axios.get(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`).then((res: AxiosResponse<IWeatherResponse>) => {
    // status 为 0 时表示查询失败
    if (res.data.status === '0') {
        log(colors.red('天气信息查询失败！'));
        return;
    }

    // count 为 0 表示没有查到天气信息
    if (res.data.count === '0') {
        log(colors.yellow('天气信息查询失败！'));
        return;
    }

    // 获取并输出第一条天气信息
    const live: ILive = res.data.lives[0];

    log('================天气预报 start====================');
    log(colors.bold(`预报时间：`), colors.yellow(`${live.reporttime}`));
    log(colors.bold(`预报地区：`), colors.white(`${live.province} ${live.city}`));
    log(colors.bold(`预报详情：`), colors.green(`${live.weather} ${live.temperature} 度`));
    log('================天气预报 end====================');
}).catch(() => {
    log(colors.red('天气服务出现异常！'));
});
