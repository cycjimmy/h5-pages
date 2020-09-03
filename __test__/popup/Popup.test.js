import Popup from '../../src/popup/Popup';

describe('Popup default test', () => {
  it('Popup test', (done) => {
    const testPopup = new Popup();

    testPopup.load();
    testPopup.render('popup').then(() => testPopup.remove());
    setTimeout(done, 1e3);
  });

  it('cover render default html text', (done) => {
    new Popup().render().then(() => done());
  });
});
