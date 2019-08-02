import colors from 'colors';
import axios, { AxiosResponse } from 'axios';
import { ILive, IWeatherResponse, IParams } from './types';
import factory from './factory';

// tslint:disable-next-line: no-console
const log = console.log;

function getWeather(params: IParams) {
  axios.get(`${params.url}?city=${encodeURI(params.city)}&key=${params.key}`).then((res: AxiosResponse<IWeatherResponse>) => {
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
}

export default factory(getWeather)
