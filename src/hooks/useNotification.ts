/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import useSocket from "./useSocket";
import { util } from "../redux/api/api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { playingTune } from "../utils/sound";
const hitSound = new Audio("click.mp3");
const clickSound = new Audio("information.mp3");

const useNotificationSound = () => {
  const { receive, joinRoom, socket } = useSocket();

  const dispatch = useAppDispatch();
  const userData: any = useAppSelector((state: any) => state.auth?.data);
  const { id, role } = userData?.data ?? {};
  let event: string;
  useEffect(() => {
    if (role === "admin") {
      event = "conversion";
    } else {
      event = "updateInfo";
    }
    if (id) {
      joinRoom(id);

      const handleUpdateInfo = async ({ data }: any) => {
        dispatch(util.invalidateTags(["overview", "information"]));

        if (data.email) {
          playingTune(hitSound);
        } else if (role === "user" && !data.email) {
          playingTune(clickSound);
        }
      };

      receive(event, handleUpdateInfo);
      return () => {
        socket.off(event, handleUpdateInfo);
      };
    }
  }, [id, receive, joinRoom]);

  return null; // This hook doesn't render anything
};

export default useNotificationSound;
