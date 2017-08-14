import { RxTestPage } from './app.po';

describe('rx-test App', () => {
  let page: RxTestPage;

  beforeEach(() => {
    page = new RxTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
