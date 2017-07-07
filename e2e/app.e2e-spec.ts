import { WdWeatherPage } from './app.po';

describe('wd-weather App', () => {
  let page: WdWeatherPage;

  beforeEach(() => {
    page = new WdWeatherPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to wd!!');
  });
});
