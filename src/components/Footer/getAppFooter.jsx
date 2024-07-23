import React from 'react'
import './footer.css'
import app_img from "/phone-app.jpg";
import app_store_logo from "/app-store-badge.png";
import google_play_logo from "/google-play-badge.png";

const getAppFooter = () => {
  return (
      <div className="olx-app-banner">
        <div className="img-div">
          <img src={app_img} alt="" />
        </div>
        <div className="text-div">
          <h1>TRY THE OLX APP</h1>
          <p>
            Buy, sell and find just about anything using <br></br>the app on
            your mobile.
          </p>
        </div>
        <div className="gplay-div">
          <p>GET YOUR APP TODAY</p>
          <img src={app_store_logo} alt="" />
          <img src={google_play_logo} alt="" />
        </div>
      </div>
  )
}

export default getAppFooter
