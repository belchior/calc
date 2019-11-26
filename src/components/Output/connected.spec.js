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
  const event = { target: { textContent: '' } };

  it('should return a object that has a key named onClick', () => {
    expect(props).toHaveProperty('onClick');
  });

  it('onClick should call dispatch function', () => {
    props.onClick(event);
    expect(dispatch).toHaveBeenCalled();
  });
});
