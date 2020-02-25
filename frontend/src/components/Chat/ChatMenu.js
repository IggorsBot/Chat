import React from 'react'

function ChatMenu() {
  return (
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
  )
}

export default ChatMenu
