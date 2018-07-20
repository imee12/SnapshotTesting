import React from 'react';
import renderer from 'react-test-renderer';
import Example from '../../src/components/Example';

describe('Example component', () => {
  test('renders a div', () => {
    const component = renderer.create(<Example>EXAMPLE</Example>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
