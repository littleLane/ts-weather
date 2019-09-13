import colors from 'colors';
import axios, { AxiosResponse } from 'axios';
import { ILive, IWeatherResponse, IParams } from './types';
import factory from './factory';

// tslint:disable-next-line: no-console
const log = console.log;

function handleResole(weatherData: IWeatherResponse) {
  // status 为 0 时表示查询失败
  if (weatherData.status === '0') {
    log(colors.red('天气信息查询失败！'));
    return;
  }

  // count 为 0 表示没有查到天气信息
  if (weatherData.count === '0') {
    log(colors.yellow('天气信息查询失败！'));
    return;
  }

  // 获取并输出第一条天气信息
  const live: ILive = weatherData.lives[0];

  log('================天气预报 start====================');
  log(colors.bold(`预报时间：`), colors.yellow(`${live.reporttime}`));
  log(colors.bold(`预报地区：`), colors.white(`${live.province} ${live.city}`));
  log(colors.bold(`预报详情：`), colors.green(`${live.weather} ${live.temperature}℃ ${live.winddirection}风`));
  log('================天气预报 end====================');
}

function handleReject() {
  log(colors.red('天气服务出现异常！'));
}

// promise 模式实现
// function getWeather(params: IParams) {
//     const requestUrl: string = `${params.url}?city=${encodeURI(params.city)}&key=${params.key}`;

//     axios.get(requestUrl).then((res: AxiosResponse<IWeatherResponse>) => {
//         handleResole(res.data);
//     }).catch(() => {
//         handleReject();
//     });
// }

// async await  模式实现
async function getWeather(params: IParams) {
  if (!params.city) {
    log(colors.red(`'city' is required！`));
    return;
  }

  const queryParams = Object.keys(params)
    .reduce((querys: string[], key: string) => {
      if (key !== 'url' && params[key]) {
        return querys.concat(`${key}=${encodeURI(params[key])}`);
      }
      return querys;
    }, [])
    .join('&');

  try {
    const requestUrl = `${params.url}?${queryParams}`;
    const resData: AxiosResponse<IWeatherResponse> = await axios.get(requestUrl);
    handleResole(resData.data);
  } catch (error) {
    handleReject();
  }
}

export default factory(getWeather);
