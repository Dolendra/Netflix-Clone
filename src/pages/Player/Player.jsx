import React from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'


const Player = () => {
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" />
      <iframe src='https://www.youtube.com/embed/ZONX0eBiw0g' frameborder="0" title='trailer'  width='90%' height='90%' ></iframe>
      <div className="player-info">
        <p>Published Date</p>
        <p>Name</p>
        <p>Type</p>
      </div>
    </div>
  )
}

export default Player
