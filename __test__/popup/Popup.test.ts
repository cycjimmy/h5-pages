import { describe, it } from 'vitest'

import Popup from '../../src/popup/Popup'

describe('popup default test', () => {
  it('popup test', async () => {
    const testPopup = new Popup()

    testPopup.load()
    await testPopup.render('popup')
    await testPopup.remove()
  })

  it('cover render default html text', async () => {
    await new Popup().render()
  })
})
