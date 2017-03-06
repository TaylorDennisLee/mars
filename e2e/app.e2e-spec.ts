import { DunePage } from './app.po';

describe('dune App', () => {
  let page: DunePage;

  beforeEach(() => {
    page = new DunePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
