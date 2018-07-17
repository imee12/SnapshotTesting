import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow, mount } from 'enzyme';
// import toJSON from 'enzyme-to-json';
import Example from '../../src/components/Example';



describe('Example component', () => {
  test('renders a div', () => {
    const component = renderer.create(
      <Example>EXAMPLE</Example>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
