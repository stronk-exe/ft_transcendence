import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MyProfile from '../../components/Profile/Me/MyProfile';
import FriendProfile from '../../components/Profile/Friend/FriendProfile';
import NotFriendProfile from '../../components/Profile/NotFriend/NotFriendProfile';
import { useClient } from '@/context/clientContext';
import { useFetch } from '@/context/fetchContext';

function Profile() {
  const [data, setData] = useState(null);
  const { client, updateClient }  = useClient();
  const navigate = useNavigate();
  const [profile, setProfile] = useState('');
  const [fetch, setFetch] = useFetch();
  const username = useParams().username !== undefined ? useParams().username : null;

  // console.log('------------------------- : username : ', username)
  // console.log('------------------------- : profile : ', profile)
  // console.log('------------------------- :data : ',data)
  // console.log('------------------------- :fetch : ',fetch)
  useEffect(() => {
    async function getUsers() {
      if (username === client.username)
        navigate('/profile')
      else if (username) {
        try {
          const res = await axios.get(`http://${import.meta.env.VITE_BACK_ADDRESS}/users/me`, { withCredentials: true });
          await updateClient({ ...client, ...res.data, signedIn: true });
        } catch {
          console.log('Error : fetch data')
        }
        try {
          const res = (await axios.get(`http://${import.meta.env.VITE_BACK_ADDRESS}/users/search/${username}`, { withCredentials: true })).data
          const check = res.filter(user => user.username === username)
        
          if (check.length) {
            setData(check);
            setProfile('Friend');
          } 
          else {
            const res = (await axios.get(`http://${import.meta.env.VITE_BACK_ADDRESS}/users/globalSearch/${username}`, { withCredentials: true })).data
            const check =  res.filter(user => user.username === username);
              if (check.length) {
                setData(check);
                setProfile('NotFriend');
              }
              else 
                setProfile('NotFound')
          }
          setFetch(true)
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      }
      else {
        setProfile('Me')
      }
    }

    getUsers();
  }, [username, fetch]);

  // console.log('profile: ', profile);

  return (
    <>
      {profile === 'Me' && <MyProfile />}
      {fetch && profile === 'Friend' && data && <FriendProfile userData={data} />}
      {fetch && profile === 'NotFriend' && data && <NotFriendProfile userData={data} />}
      {profile === 'NotFound' && <span className='no-users'> No User Found .... </span>}
    </>
  );
}

export default Profile;
