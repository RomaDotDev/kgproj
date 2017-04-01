import { KgprojPage } from './app.po';

describe('kgproj App', () => {
  let page: KgprojPage;

  beforeEach(() => {
    page = new KgprojPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
