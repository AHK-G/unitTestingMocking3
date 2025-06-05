import {
  WeatherData,
  ApiResponse,
  ApiClient,
  WeatherService,
} from "../src/WeatherService";

describe("Weather Service", () => {
  let data: WeatherData;
  let weatherStub: ApiClient;
  let weatherService: WeatherService;

  beforeEach(() => {
    data = {
      temperature: 25,
      humidity: 40,
      airQuality: "good",
    };
    weatherStub = {
      get: (url: string): Promise<ApiResponse> => Promise.resolve({ data }),
    };

    weatherService = new WeatherService(weatherStub);
  });

  it("should call Api Client with correct parameters", async () => {
    const city = "vienna";
    const weatherApiUrl = `/weather?city=${city}`;
    const getWeatherSpy = jest.spyOn(weatherStub, "get");

    await weatherService.getWeather(city);

    expect(getWeatherSpy).toHaveBeenCalledWith(weatherApiUrl);
  });

  it("should get the weather for a specific city that is requested", async () => {
    const weatherData = await weatherService.getWeather("vienna");

    expect(weatherData).toStrictEqual(data);
  });

  it("should call the api to get a city's temperature with the right parameter", async () => {
    const city = "vienna";
    const weatherApiUrl = `/weather?city=${city}`;
    const getWeatherSpy = jest.spyOn(weatherStub, "get");

    await weatherService.getTemperature(city);

    expect(getWeatherSpy).toHaveBeenCalledWith(weatherApiUrl);
  });

  it("should get the temperature for a specific city that is requested", async () => {
    const weatherData = await weatherService.getTemperature("vienna");

    expect(weatherData).toStrictEqual(data.temperature);
  });
});
