import { browser, by, element } from 'protractor';

export class WdWeatherPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('wd-root h1')).getText();
  }
}
