import React from 'react';

function Chat() {
  return (
      <div>
        <div className="row justify-content-between border-bottom">
          <div className="col-4">
              <div className="">
                <div className="row ml-2">
                  <div className=" my-2 col-2">
                    <img src="http://localhost:800/static/icons/folder.png" alt="folder" height="24" width="24"/>
                  </div>

                  <div className="col">
                    <div className="row">Byrom Guittet</div>
                    <div className="row">writting...</div>
                  </div>

                </div>
              </div>
          </div>

          <div className="col-auto">
            <div className=" p-2 border">
              <img src="http://localhost:800/static/icons/dots.png" alt="folder" height="24" width="24"/>
            </div>
          </div>

        </div>


        <div className="row">2</div>

        <div className="row border-top">

            <div className="col-10 form-group my-3 mx-2">
              <input className="form-control input-lg" id="inputlg" type="text" placeholder="Write a message"/>
            </div>
            <div className="mx-1">
              <div className=" p-2 my-3 mx-1 border">
                <img src="http://localhost:800/static/icons/dots.png" alt="folder" height="24" width="24"/>
              </div>
            </div>
            <div className="">
              <div className=" p-2 my-3 border">
                <img src="http://localhost:800/static/icons/dots.png" alt="folder" height="24" width="24"/>
              </div>
            </div>
        </div>
      </div>
  )

}

export default Chat
