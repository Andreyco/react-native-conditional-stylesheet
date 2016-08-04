jest.unmock('../module');

const createSelector = require('../module');

/**
 * Style Definitions for testing
 */
const style = {
  button: {
    padding: 20,
  },
  buttonBlue: {
    backgroundColor: 'blue',
  },
};

const borderColor = { borderColor: 'red' };

const borderWidth = { borderWidth: 2 };

/**
 * Tests
 */
describe('Conditional StyleSheet', () => {
  it('picks enumerated style descriptions', () => {
    const select = createSelector(style);
    const selectedStyles = select('button');
    expect(selectedStyles[0]).toEqual(style.button);
    expect(selectedStyles[1]).toBeUndefined();
  });

  it('picks style definitions by condition', () => {
    const select = createSelector(style);
    const selectedStyles = select({ button: true, buttonBlue: false });
    expect(selectedStyles[0]).toEqual(style.button);
    expect(selectedStyles[1]).toBeUndefined();
  });

  it('accepts additional style definitions', () => {
    const select = createSelector(style);
    const selectedStyles = select({ buttonBlue: true }).add(borderColor).add(borderWidth);
    expect(selectedStyles[1]).toEqual(borderColor);
    expect(selectedStyles[2]).toEqual(borderWidth);
  });

  it('throws in DEV when requesting undefined style', () => {
    const select = createSelector(style);
    expect(() => {
      select('buttonRed')
    }).toThrow(new Error('[ConditionalStyleSheet] Requesting undefined style: buttonRed'));

    expect(() => {
      select({ buttonRed: false })
    }).toThrow(new Error('[ConditionalStyleSheet] Requesting undefined style: buttonRed'));
  });

  it('doesnt throw in PRODUCTION when requesting undefined style', () => {
    // Hijack env variable
    const oldDev = global.__DEV__;
    global.__DEV__ = false;
    const select = createSelector(style);
    expect(() => {
      select('buttonRed')
    }).not.toThrow(new Error('[ConditionalStyleSheet] Requesting undefined style: buttonRed'));

    expect(() => {
      select({ buttonRed: false })
    }).not.toThrow(new Error('[ConditionalStyleSheet] Requesting undefined style: buttonRed'));
    // Restore env variable
    global.__DEV__ = oldDev;
  });
});
