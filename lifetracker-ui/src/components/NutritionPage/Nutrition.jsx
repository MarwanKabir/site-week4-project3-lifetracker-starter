import React from "react"

export default function Nutrition({ loggedIn }) {
  return (
    <>
      {loggedIn ? (
        <div className="Banner">
          <h1>NEXT FEATURE COMING SOON!</h1>
        </div>
      ) : (
        <h1>LOG IN TO VIEW</h1>
      )}
    </>
  )
}
