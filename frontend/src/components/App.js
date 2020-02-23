import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return(
      <div>
        <div className="d-flex bd-highlight">
          <div className="p-2 bd-highlight mx-5">Flex item</div>
          <div className="p-2 bd-highlight mx-5">Flex item</div>
          <div className="p-2 flex-grow-1 bd-highlight">Third flex item</div>
        </div>
      </div>
    )

  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
