import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Example2 from '../../src/components/Example2';


describe('Example2', () => {
  test('renders a shallow example', () => {
    const wrapper = shallow(<Example2 />);

    expect(wrapper).toMatchSnapshot();
  });


  test('renders a detailed example with rendered children', () => {
    const component = renderer.create(<Example2 />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
