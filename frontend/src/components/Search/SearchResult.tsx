import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface User {
    id: number,
    username: string,
    usrChatId: number,
}

export const SearchResult = ({ onClose, searchResults }: any) => {

    // console.log('wazawizzz ', typeof(searchResults))


    const createChat = async (user: User) => {
        // check if we find a commun chatId between the current user and this user
        const sender = 1
        const receiver = user.id
        const chats = await (await axios.get(`http://localhost:8000/chat/${sender}`)).data
        const communChats = await (await axios.get(`http://localhost:8000/chat`, {
            params: {
                'sender': sender,
                'receiver': receiver,
            }
        })).data
        console.log('chatsssss ', chats, receiver)
        console.log('Commun stuff', communChats)
        // console.log('Commun shit ', axios.get(`http://localhost:8000/chat`, {
        //     params: {
        //         'sender': sender,
        //         'receiver': receiver,
        //     }
        // }))
        if (communChats.length === 0) {

            // create chat
            console.log('WE CREATE NEW CHAT')
            try {
                return await axios.post('http://localhost:8000/chat', {
                    senId: sender,
                    recId: receiver,
                })
            }
            catch (err) {
                console.log(`Couldn't create new Chat: `, err)
            }
        }
        // console.log('Commun id -> ', userChatId.some(e => currentUserId.includes(e)))
        // if (!userChatId.some(e => currentUserId.includes(e)))
        // {

        // }
        // open chat
    }

    return (
        <div className="searchChatResults">
            <div className="searchChatResults-container">
                { searchResults.length ? 
                    searchResults.map((user: any, index: number) => (
                    <div key={index} className="userChats" onClick={() => createChat(user)} >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV73Nl_MHzYV13X62NIRC8IX6FT6fenPinqCSSOS0HTQ&s" alt="" />
                        <div className="userChatInfo">
                            <span>{user.username }</span>
                        </div>
                    </div>
                )) : 'Ghayarha a sadi9'
                }
            </div>
            <span onClick={onClose}><FontAwesomeIcon icon={faCircleXmark} /></span>
        </div>
    );
};
