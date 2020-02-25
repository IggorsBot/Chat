import React from 'react'

function InputMessage () {
  return (
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
  )
}

export default InputMessage
