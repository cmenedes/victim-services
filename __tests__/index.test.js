import index from '../src/js/index'
import App from '../src/js/App'

jest.mock('../src/js/App')

describe('App is created', () => {

  test('App is created', () => {
    expect.assertions(1)
    expect(App).toHaveBeenCalledTimes(1)
  })
})
