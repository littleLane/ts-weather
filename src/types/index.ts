export interface ILive {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

export interface IWeatherResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  lives: ILive[];
}

export interface IConfigData {
  url: string;
  key: string;
}

export interface IParams extends IConfigData {
  city: string;
  type?: string;
  [key: string]: any;
}
