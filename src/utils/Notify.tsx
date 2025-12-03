import { useEffect } from 'react';

const NotificationPermission = () => {
  useEffect(() => {
    // Check if the browser supports Notifications API
    if ("Notification" in window) {
      // Request permission for notifications automatically
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          // Optionally, you can show a notification after permission is granted
          new Notification("Thanks for allowing notifications!");
        } else {
          console.log("Notification permission denied.");
        }
      }).catch(error => {
        console.log("Error requesting notification permission:", error);
      });
    } else {
      console.log("This browser does not support notifications.");
    }
  }, []);

  return <div></div>;
};

export default NotificationPermission;
