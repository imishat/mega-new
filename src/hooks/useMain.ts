/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import useSocket from './useSocket'

const useMainHooks = () => {
  const { sendToServer, receive, socket,joinRoom } = useSocket() 
  console.log("Socket ID:", socket.id)

  const playNotification = () => {
    const audio = new Audio('notification.mp3')  // Adjust path here
    audio.play().catch((err) => console.error("Sound error:", err))
  }

  const sendOnlineStatus = () => {
    sendToServer('online','online-status', { status: 'online', userId: socket.id })
  }

  useEffect(() => {
    joinRoom('addUser')
    // Example event listener: 'online-user'
    receive('updateInfo', (data:any) => {
      console.log("Received online user event:", data)
      console.log(data)
      playNotification()  // Play sound
    })

    sendOnlineStatus()

    return () => {
      socket.off('online-user')  // Remove listener
    }
  }, [sendToServer, receive, socket]) 

  return {
    sendOnlineStatus,
    playNotification
  }
}

export default useMainHooks
