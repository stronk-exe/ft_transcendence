import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchInviteResults } from './SearchInviteResults';

interface User {
    username: string,
}

interface RoomUsers {
    roomId: number,
    userId: number,
    role: string
}

export const RoomMembers = ({ currentRoom }: any) => {

    const [roomMembers, setRoomMembers] = useState<User[] | null>([])

    useEffect(() =>{
        const getRoomMembers = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/roomUsers/${currentRoom.id}`, {withCredentials: true})
                if (result.data) {
                    let membersIds: number[] = []
                    result.data.map((member: RoomUsers) => (
                        membersIds.push(member?.userId)
                    ))
                    let members: User[] = []
                    for (let i=0; i<membersIds.length; i++) {
                        try {
                            const user = await axios.get(`http://localhost:8000/users/${membersIds[i]}`, {withCredentials: true})
                            members.push(user.data)
                        }
                        catch (err) {
                            console.error(`Couldn't fetch any user`)
                        }
                    }
                    setRoomMembers(members)
                }
            }
            catch {
                console.error('No users for this room')
            }
        }
        getRoomMembers()
    }, [])

    console.log('ROOM Members ', roomMembers)
    console.log(currentRoom)

    return (
        <div className='roomMembers'>
            <p>Members</p>
            {
                roomMembers?.map((user: User) => (
                    <p className='roomMember' >{ user.username }</p>
                ))
            }
        </div>
    );
};
