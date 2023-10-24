import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface User {
    id: number,
}

export const SearchInviteResults = ({ chatData, searchResults }: any) => {

    const currentRoom = chatData?._chat?.chat

    const sendInvite = async (invitedUser: User) => {
        console.log('joinina assi ', invitedUser.id, currentRoom.id)

        // try {
        //     const _MAIN_USER_ = await (await axios.get(`http://localhost:8000/users/me`, {withCredentials: true})).data
        //     const response = await axios.post(`http://localhost:8000/invitations`, {
        //         sender: _MAIN_USER_.id,
        //         receiver: invitedUser.id,
        //         roomId: currentRoom.id,
        //     }, {
        //         withCredentials: true,
        //     });

        //     console.log('rah mzyaaan', response.data)
        // }
        // catch (error) {
        //     console.log(error);
        // }
        try {
            await axios.post(`http://localhost:8000/roomUsers`, {
                roomId: currentRoom.id,
                userId: invitedUser.id,
                role: 'MEMBER',
            },
            {
                withCredentials: true,
            });
            chatData?._socket?.emit('roomMembers', invitedUser)
            chatData?._socket?.emit('createRoom', chatData?._chat?.chat)
            console.log('rah mzyaaan', invitedUser)
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="searchInviteResults">
            {
                searchResults.map((user: any, index: number) => (
                    <div className='inviteResults' key={index}>
                        <span className='resultName'>{ user.username }</span>
                        <FontAwesomeIcon className="inviteIcon" icon={faUserPlus} onClick={() => sendInvite(user)} />
                    </div>
                ))
            }
        </div>
    );
};
