import { RpslsGhPagesPage } from './app.po';

describe('rpsls-gh-pages App', function() {
  let page: RpslsGhPagesPage;

  beforeEach(() => {
    page = new RpslsGhPagesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
