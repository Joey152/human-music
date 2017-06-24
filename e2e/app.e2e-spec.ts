import { HumanMusicPage } from './app.po';

describe('human-music App', () => {
  let page: HumanMusicPage;

  beforeEach(() => {
    page = new HumanMusicPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
