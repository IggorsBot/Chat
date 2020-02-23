import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Menu from './Menu/Menu'

class App extends Component {
  render() {
    return(
      <div className="d-flex bd-highlight">
        <div className="p-2 bd-highlight px-5 border-right">
          <Menu />
        </div>
        <div className="p-2 bd-highlight">Flex item</div>
        <div className="p-2 bd-highlight flex-grow-1">Third flex item</div>
      </div>
    )

  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
