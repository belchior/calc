import {mapStateToProps, mapDispatchToProps} from './index';

test('mapStateToProps should return the object key named macwidget', () => {
  const macwidget = {a: 1};
  const state = {macwidget: macwidget};
  const props = mapStateToProps(state);

  expect(props).toEqual(macwidget);
});

describe('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  const event = {target: {getAttribute: () => ''}};

  test('clearClick function should exist', () => {
    expect(props).toHaveProperty('clearClick');
  });

  test('clearClick should call dispatch function', () => {
    props.clearClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('divisionClick function should exist', () => {
    expect(props).toHaveProperty('divisionClick');
  });

  test('divisionClick should call dispatch function', () => {
    props.divisionClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('dotClick function should exist', () => {
    expect(props).toHaveProperty('dotClick');
  });

  test('dotClick should call dispatch function', () => {
    props.dotClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('equalsClick function should exist', () => {
    expect(props).toHaveProperty('equalsClick');
  });

  test('equalsClick should call dispatch function', () => {
    props.equalsClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('memoryClearClick function should exist', () => {
    expect(props).toHaveProperty('memoryClearClick');
  });

  test('memoryClearClick should call dispatch function', () => {
    props.memoryClearClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('memoryMinusClick function should exist', () => {
    expect(props).toHaveProperty('memoryMinusClick');
  });

  test('memoryMinusClick should call dispatch function', () => {
    props.memoryMinusClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('memoryPlusClick function should exist', () => {
    expect(props).toHaveProperty('memoryPlusClick');
  });

  test('memoryPlusClick should call dispatch function', () => {
    props.memoryPlusClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('memoryRecallClick function should exist', () => {
    expect(props).toHaveProperty('memoryRecallClick');
  });

  test('memoryRecallClick should call dispatch function', () => {
    props.memoryRecallClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('minusClick function should exist', () => {
    expect(props).toHaveProperty('minusClick');
  });

  test('minusClick should call dispatch function', () => {
    props.minusClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('multiplicationClick function should exist', () => {
    expect(props).toHaveProperty('multiplicationClick');
  });

  test('multiplicationClick should call dispatch function', () => {
    props.multiplicationClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('numberClick function should exist', () => {
    expect(props).toHaveProperty('numberClick');
  });

  test('numberClick should call dispatch function', () => {
    props.numberClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('plusClick function should exist', () => {
    expect(props).toHaveProperty('plusClick');
  });

  test('plusClick should call dispatch function', () => {
    props.plusClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('disableError function should exist', () => {
    expect(props).toHaveProperty('disableError');
  });

  test('disableError should call dispatch function', () => {
    jest.useFakeTimers();
    props.disableError(event);
    jest.runAllTimers();
    expect(dispatch).toHaveBeenCalled();
  });

});
