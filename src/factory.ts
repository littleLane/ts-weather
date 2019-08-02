import { IConfigData } from './types';

const factory: Function = (configData: IConfigData) => (method: Function) => (city: string) => method({ ...configData, city });

const URL = 'http://restapi.amap.com/v3/weather/weatherInfo';
const KEY = '5bf40bae03f0adf4f80b6c3b5dde89ad';

export default factory({
    url: URL,
    key: KEY
});