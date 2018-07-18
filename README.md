# SnapshotTesting

Snapshots are a fantastic tool for identifying unexpected interface changes within your application – whether that interface is an API response, UI, logs, or error messages.

To get started in an existing application, 

1. Run

```javascript

yarn add --dev jest babel-jest babel-preset-env babel-preset-react react-test-renderer

```

OR: you can clone this repository and follow along.

2. Ensure your .babelrc file looks something like this: 

```javascript
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions"]
      },
      "modules": false,
    }],
    "react",
    "stage-2",
  ],
  "env": {
  "development": {},
  "test": {
    "presets": [
      "env",
      "react",
      "stage-2"
    ]
  },
  },
  "plugins": ["react-hot-loader/babel"],
}


```
3. Ensure testSetup.js file has an Adapter:

```javascript

import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

```

4. Let's use a simple component. Refer to src/components/Example.jsx

```javascript
import React from 'react';


const Example = () => (
  <div>
    <h1>EXAMPLE</h1>
  </div>
);

export default Example

```

5. Let's write a test for this component. Refer to tests/components/Example.spec.js

```javascipt
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

```

# Tips to Remember

1. When to use shallow versus renderer.create

Shallow rendering renders only component itself without its children. 
So if you change something in a child component it won’t change shallow output of your component. 
Or a bug, introduced to a child component, won’t break your component’s test. It also doesn’t require DOM.

http://blog.sapegin.me/all/react-jest SHOW EXAMPLE IN EXAMPLE2
