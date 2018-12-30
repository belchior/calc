import {mapStateToProps, mapDispatchToProps} from './index';

test('mapStateToProps should return the object key named custom', () => {
  const custom = {a: 1};
  const state = {custom: custom};
  const props = mapStateToProps(state);

  expect(props).toEqual(custom);
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

  test('deleteClick function should exist', () => {
    expect(props).toHaveProperty('deleteClick');
  });

  test('deleteClick should call dispatch function', () => {
    props.deleteClick(event);
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

  test('parenthesisLeftClick function should exist', () => {
    expect(props).toHaveProperty('parenthesisLeftClick');
  });

  test('parenthesisLeftClick should call dispatch function', () => {
    props.parenthesisLeftClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('parenthesisRightClick function should exist', () => {
    expect(props).toHaveProperty('parenthesisRightClick');
  });

  test('parenthesisRightClick should call dispatch function', () => {
    props.parenthesisRightClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('percentageClick function should exist', () => {
    expect(props).toHaveProperty('percentageClick');
  });

  test('percentageClick should call dispatch function', () => {
    props.percentageClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('piClick function should exist', () => {
    expect(props).toHaveProperty('piClick');
  });

  test('piClick should call dispatch function', () => {
    props.piClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('plusClick function should exist', () => {
    expect(props).toHaveProperty('plusClick');
  });

  test('plusClick should call dispatch function', () => {
    props.plusClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('powerClick function should exist', () => {
    expect(props).toHaveProperty('powerClick');
  });

  test('powerClick should call dispatch function', () => {
    props.powerClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  test('sqrtClick function should exist', () => {
    expect(props).toHaveProperty('sqrtClick');
  });

  test('sqrtClick should call dispatch function', () => {
    props.sqrtClick(event);
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
