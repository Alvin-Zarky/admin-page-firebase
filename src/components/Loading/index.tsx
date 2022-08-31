import React from 'react'
import './loading.scss'

export default function Loading() {
  return (
    <>
      <tr className="table-tr">
        <td className="table-border">
          <div className="loading">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
        </td>
      </tr>
    </>
  )
}
