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
