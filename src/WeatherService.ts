export interface WeatherData {
    temperature: number;
    [key: string]: any;
}

export interface ApiResponse {
    data: WeatherData;
}

export interface ApiClient {
    get(url: string): Promise<ApiResponse>;
}

export class WeatherService {
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    public async getWeather(city: string): Promise<WeatherData> {
        const response = await this.apiClient.get(`/weather?city=${city}`);
        return response.data;
    }

    public async getTemperature(city: string): Promise<number> {
        const weather = await this.getWeather(city);
        return weather.temperature;
    }
}
