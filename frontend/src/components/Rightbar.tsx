import { ChatInfos } from "./ChatInfos"
import { RoomInfos } from "./RoomInfos"

export const Rightbar = ({ chatData }: any) => {
  return (
    <div className="rightSidebar">
      {console.log('lhhj li wssal -> ', chatData?._chat?.type)}
        { chatData && chatData?._chat?.type === 'chat' && <ChatInfos currentUser={ chatData?._user } /> }
        { chatData && chatData?._chat?.type === 'room' && <RoomInfos currentRoom={ chatData?._chat?.chat } /> }
    </div>
  )
}
