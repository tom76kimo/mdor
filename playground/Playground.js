import React from 'react';

// add whatever you want to play with
import mdor from './index';

const {Badge, Button, Slider, Tooltip, Checkbox, Radio, RadioGroup, Spinner, NavigationLayout} = mdor;

class Playground extends React.Component {
  render() {
    return (
      <div>
        <NavigationLayout mode="standard" tabBar={{
          'tab1': {
            content: 'tab1',
            isActive: true,
          },
          'tab2': {
            content: 'tab2',
            isActive: false,
          }
        }} fixedHeader ripple drawer defaultTab="tab1"></NavigationLayout>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {};
  }
}

React.render(<Playground />, document.body);
