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
3. Make sure you package.json has the following:

```javascript
  "jest": {
      "setupTestFrameworkScriptFile": "<rootDir>/test/testSetup.js",
      "snapshotSerializers": ["enzyme-to-json/serializer"]
    }

```
AND

```javascript
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watchAll"
  },

```

4. Ensure testSetup.js file has an Adapter:

```javascript

import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

```

# Let's Test Some Stuff

1. Let's use a simple component. Refer to src/components/Example.jsx

```javascript
import React from 'react';


const Example = () => (
  <div>
    <h1>EXAMPLE</h1>
  </div>
);

export default Example

```

2. Let's write a test for this component. Refer to tests/components/Example.spec.js

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

3. Run
```javascript
yarn test
```

4. In your tests folder, you will find another folder __snapshots__ and a file Example.spec.js.snap. Open that up.
This is your snapshot:

```javascript
exports[`Example component renders a div 1`] = `
<div>
  <h1>
    EXAMPLE
  </h1>
</div>
`;
```
5. In src/components/Example.jsx, change your markup to anything you want.
Run
```javascript
yarn test
```
Notice your test has now FAILED:

```javascript
Received value does not match stored snapshot "Example component renders a div 1".
```

Review the snapshot versus the received. This was an expected change. How do we fix this?

EASY!

6. Run

```javascript
yarn test -u

```

This updates your snapshot!


As a shortcut while you are developing and writing tests, 

Run

```javascript
yarn test:watch

```

7. Go back to src/components/Example.jsx. Change the markup again.

The test fails, but you can simply press 'u' to update the snapshot.



# Tips to Remember

1. When to use shallow versus renderer.create

Shallow rendering renders only component itself without its children. 
So if you change something in a child component it won’t change the shallow output of your component. 
Or a bug, introduced to a child component, won’t break your component’s test. It also doesn’t require DOM.

- Let's look at an example. Open up:

src/components/Example2.jsx
tests/components/Example2.spec.js
tests/components/_snapshots_/Example2.spec.js

Notice the difference between the snapshots for the shallow example and the detailed example.

Shallow:
```javascript
exports[`Example2 renders a shallow example 1`] = `
<div>
  <h1>
    EXAMPLE2
  </h1>
  <Icon
    altText=""
    className=""
    icon="soccer-ball-o"
  />
</div>
`;

```

Detailed:
```javascript
exports[`Example2 renders a detailed example with rendered children 1`] = `
<div>
  <h1>
    EXAMPLE2
  </h1>
  <span>
    <i
      className="fa fa-soccer-ball-o"
      title=""
    />
    <span
      className="visually-hidden"
    >
      
    </span>
  </span>
</div>
`;

```

The shallow test example does not render the icon, where the detailed one does.


2. Treat snapshots as code

Commit snapshots and review them as part of your regular code review process. 
This means treating snapshots as you would any other type of test or code in your project.

3. Use descriptive snapshot names

Always strive to use descriptive test and/or snapshot names for snapshots. 
The best names describe the expected snapshot content. 
This makes it easier for reviewers to verify the snapshots during review, and for anyone to know whether or not an outdated snapshot is the correct behavior before updating.

# Resources

https://jestjs.io/docs/en/snapshot-testing

http://blog.sapegin.me/all/react-jest

https://github.com/sapegin/jest-cheat-sheet
