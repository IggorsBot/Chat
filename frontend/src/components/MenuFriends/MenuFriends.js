
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Chats extends Component {
  render() {
    return(
        <div>
          <div className="row mt-3">
            <div className="mr-5"><h2 className="mx-5 my-2">Friends</h2></div>
            <div className="border rounded mx-2 mr-5"><img className="mt-3 mx-3" src="http://localhost:800/static/icons/add-user.png" alt="user" height="18" width="18"/></div>
          </div>

          <div className="form-group my-5 mx-2">
            <input className="form-control input-lg" id="inputlg" type="text" placeholder="Search chats"/>
          </div>

          <div className="border-bottom pb-2">
            <div className="row ml-2">
              <div className=" my-2 col-2">
                <img src="http://localhost:800/static/icons/folder.png" alt="folder" height="24" width="24"/>
              </div>

              <div className="col">
                <div className="row">Harrietta Souten</div>
                <div className="row">Dental Hygientist</div>
              </div>

              <div className="col-2"></div>

            </div>
          </div>
        </div>
    )
  }
}

export default Chats
