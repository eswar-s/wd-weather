export const environment = {
  production: true,
  /**
   * couldn't access http://api.openweathermap.org/data/2.5/forecast from github pages,
   * throwing Mixed content error, So using nodejs in middle to bypass
   */
  openWeatherAPI: 'https://immense-cliffs-51527.herokuapp.com/'
};
