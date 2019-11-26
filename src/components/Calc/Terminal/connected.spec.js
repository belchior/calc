import { mapStateToProps, mapDispatchToProps } from './index';

describe('mapStateToProps', () => {
  it('should return the object key named terminal', () => {
    const terminal = { a: 1 };
    const state = { terminal };
    const props = mapStateToProps(state);

    expect(props).toStrictEqual(terminal);
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

  it('deleteClick function should exist', () => {
    expect(props).toHaveProperty('deleteClick');
  });

  it('deleteClick should call dispatch function', () => {
    props.deleteClick(event);
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

  it('parenthesisLeftClick function should exist', () => {
    expect(props).toHaveProperty('parenthesisLeftClick');
  });

  it('parenthesisLeftClick should call dispatch function', () => {
    props.parenthesisLeftClick(event);
    expect(dispatch).toHaveBeenCalled();
  });

  it('parenthesisRightClick function should exist', () => {
    expect(props).toHaveProperty('parenthesisRightClick');
  });

  it('parenthesisRightClick should call dispatch function', () => {
    props.parenthesisRightClick(event);
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
