import { mapStateToProps, mapDispatchToProps } from './index';


describe('mapStateToProps', () => {
  it('should return the object key named macwidget', () => {
    const macwidget = { a: 1 };
    const state = { macwidget };
    const props = mapStateToProps(state);

    expect(props).toStrictEqual(macwidget);
  });
});

describe('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  const event = { target: { getAttribute: () => '' } };

  it('clearClick function should exist', () => {
    expect(props).toHaveProperty('clearClick');
  });

  it('clearClick should call dispatch function', () => {
    props.clearClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('divisionClick function should exist', () => {
    expect(props).toHaveProperty('divisionClick');
  });

  it('divisionClick should call dispatch function', () => {
    props.divisionClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('dotClick function should exist', () => {
    expect(props).toHaveProperty('dotClick');
  });

  it('dotClick should call dispatch function', () => {
    props.dotClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('equalsClick function should exist', () => {
    expect(props).toHaveProperty('equalsClick');
  });

  it('equalsClick should call dispatch function', () => {
    props.equalsClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('memoryClearClick function should exist', () => {
    expect(props).toHaveProperty('memoryClearClick');
  });

  it('memoryClearClick should call dispatch function', () => {
    props.memoryClearClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('memoryMinusClick function should exist', () => {
    expect(props).toHaveProperty('memoryMinusClick');
  });

  it('memoryMinusClick should call dispatch function', () => {
    props.memoryMinusClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('memoryPlusClick function should exist', () => {
    expect(props).toHaveProperty('memoryPlusClick');
  });

  it('memoryPlusClick should call dispatch function', () => {
    props.memoryPlusClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('memoryRecallClick function should exist', () => {
    expect(props).toHaveProperty('memoryRecallClick');
  });

  it('memoryRecallClick should call dispatch function', () => {
    props.memoryRecallClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('minusClick function should exist', () => {
    expect(props).toHaveProperty('minusClick');
  });

  it('minusClick should call dispatch function', () => {
    props.minusClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('multiplicationClick function should exist', () => {
    expect(props).toHaveProperty('multiplicationClick');
  });

  it('multiplicationClick should call dispatch function', () => {
    props.multiplicationClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('numberClick function should exist', () => {
    expect(props).toHaveProperty('numberClick');
  });

  it('numberClick should call dispatch function', () => {
    props.numberClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('plusClick function should exist', () => {
    expect(props).toHaveProperty('plusClick');
  });

  it('plusClick should call dispatch function', () => {
    props.plusClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('disableError function should exist', () => {
    expect(props).toHaveProperty('disableError');
  });

  it('disableError should call dispatch function', () => {
    jest.useFakeTimers();
    props.disableError(event);
    jest.runAllTimers();
    expect(dispatch).toHaveBeenCalled();
  });

});
