interface IWeather {
    id: number,
    main: string,
    description: string,
    icon: string
}

export default interface IWeatherData {
    data: {
        coord: {
            lon: number,
            lat: number
        },
        weather: IWeather[],
        base: string,
        main: {
            temp: number,
            feels_like: number,
            temp_min: number,
            temp_max: number,
            pressure: number,
            humidity: number,
            sea_level: number,
            grnd_level: number
        },
        visibility: number,
        wind: {
            speed: number,
            deg: number
        },
        clouds: {
            all: number
        },
    }
}