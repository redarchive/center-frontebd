import React from 'react'
import ProfileHeader from './profile-header'
import ProfileItemList from './profile-itemlist'

const Profile = (): JSX.Element => {
  return (
    <>
      <div>
        <ProfileHeader />
        <ProfileItemList />
      </div>
    </>
  )
}

export default Profile
