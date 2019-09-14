import colors from 'colors';
import axios, { AxiosResponse } from 'axios';
import Table from 'cli-table';
import { isEmptyArray } from './utils';
import { ILive, IForecast, IWeatherResponse, IParams } from './types';
import factory from './factory';

// tslint:disable-next-line: no-console
const log = console.log;

function handleResole(weatherData: IWeatherResponse, params: IParams) {
  // status 为 0 时表示查询失败
  if (weatherData.status === '0') {
    log(colors.red('天气信息查询失败！'));
    return;
  }

  // count 为 0 表示没有查到天气信息
  if (weatherData.count === '0') {
    log(colors.yellow(`没有查到 '${params.city}' 天气信息！`));
    return;
  }

  if (params.extensions === 'all') {
    const forecasts: IForecast[] = weatherData.forecasts || [];

    if (isEmptyArray(forecasts)) {
      log(colors.yellow(`没有查到 '${params.city}' 天气信息！`));
    } else {
      const forecast = forecasts[0];

      const table = new Table({
        head: ['日期', '星期', '白天', '晚上'],
        colWidths: [15, 8, 22, 22],
      });

      if (!isEmptyArray(forecast.casts)) {
        forecast.casts.map(cast => {
          table.push([
            cast.date,
            cast.week,
            `${cast.dayweather}（${cast.daytemp}℃，${cast.daywind} ${cast.daypower}）`,
            `${cast.nightweather}（${cast.nighttemp}℃，${cast.nightwind} ${cast.nightpower}）`,
          ]);
        });
      }

      log('================天气预报 start====================');
      log(colors.bold(`预报时间：`), colors.yellow(`${forecast.reporttime}`));
      log(colors.bold(`预报地区：`), colors.white(`${forecast.province} ${forecast.city}`));
      log(colors.bold(`预报详情：`));
      log(table.toString());
      log('================天气预报 end====================');
    }
  } else {
    const lives: ILive[] = weatherData.lives || [];

    if (isEmptyArray(lives)) {
      log(colors.yellow(`没有查到 '${params.city}' 天气信息！`));
    } else {
      const live = lives[0];

      log('================天气预报 start====================');
      log(colors.bold(`预报时间：`), colors.yellow(`${live.reporttime}`));
      log(colors.bold(`预报地区：`), colors.white(`${live.province} ${live.city}`));
      log(colors.bold(`预报详情：`), colors.green(`${live.weather} ${live.temperature}℃ ${live.winddirection}风`));
      log('================天气预报 end====================');
    }
  }

  process.exit();
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
    handleResole(resData.data, params);
  } catch (error) {
    handleReject();
  }
}

export default factory(getWeather);
