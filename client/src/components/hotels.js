import React from 'react'

export default function hotels({hotelName, nightlyPrice, address, hotelIMG}) {
  return (
    <div className="flex flex-column ma2 ba w-50 br3 shadow-3 b--black-20 georgia">
      <div className="ml2 f3 lh-copy">{hotelName}</div>
      <div className="ml2 mb2 f5 lh-copy">Address: {address}</div>
      <div className="flex flex-row justify-between items-end ml2">
        <div style={{ background: hotelIMG + " no-repeat", height: '150px', width: '200px' }}></div>
        <div className="mb3 mr3 f3 lh-copy tc">{nightlyPrice}</div>
      </div>
    </div>
  )
}
