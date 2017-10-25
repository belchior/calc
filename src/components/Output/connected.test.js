import {mapStateToProps, mapDispatchToProps} from './index';

test('mapStateToProps should return the object key named terminal', () => {
  const terminal = {a: 1};
  const state = {terminal: terminal};
  const props = mapStateToProps(state);

  expect(props).toEqual(terminal);
});

describe('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  const event = {target: {textContent: ''}};

  test('should return a object that has a key named onClick', () => {
    expect(props).toHaveProperty('onClick');
  });

  test('onClick should call dispatch function', () => {
    props.onClick(event);
    expect(dispatch).toHaveBeenCalled();
  });
});
