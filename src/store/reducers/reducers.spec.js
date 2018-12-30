import rootReducer from './index';

describe('Root Reducer', () => {
  it('should be able be called', () => {
    expect(rootReducer(undefined, undefined)).toBeTruthy();
  });
  it('should have a property named custom', () => {
    expect(rootReducer(undefined, undefined)).toHaveProperty('custom');
  });
  it('should have a property named terminal', () => {
    expect(rootReducer(undefined, undefined)).toHaveProperty('terminal');
  });
  it('should have a property named macwidget', () => {
    expect(rootReducer(undefined, undefined)).toHaveProperty('macwidget');
  });
});
