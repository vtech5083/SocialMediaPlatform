// src/components/Friends.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../css/Friends.css"
const Friends = () => {
  const [friends, setFriends] = useState([])

  // Assume the current user ID is 1, you can adjust base on the actual situation
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/friends/all/${userId}`
        )
        setFriends(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchFriends()
  }, [userId])

  const handleRemoveFriend = async friendId => {
    try {
      await axios.delete(
        `http://localhost:8080/api/friends/${userId}/${friendId}`
      )
      setFriends(friends.filter(friend => friend.friend.userId !== friendId))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="friends-container">
      <h1>
        Friends
      </h1>
      <div className="friend-container">
        {friends.map(friend => (
          <div className="friend-items" key={friend.id.friendId}>
            <div className="friend">
              <div className="fiend-title">
                <h2 >
                  {friend.friend.firstName} {friend.friend.lastName}
                </h2>
                <p>
                  {friend.friend.email}
                </p>
              </div>
              <div className="friend-action">
                <button
                  onClick={() => handleRemoveFriend(friend.friend.userId)}
                >
                  Remove Friend
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Friends
