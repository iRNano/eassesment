import React,{useEffect, useState} from 'react';
import { CardContainer, CardContent, CardTitle } from '../styles/Card.styled';
import axios from 'axios';

interface User {
  name: string;
  email: string;
}

const parseResponse = ({results = []}) => {
    const {email, name } = results[0]
    const {first, last} = name
    return {
        name: `${first} ${last}`,
        email,
    }
}

const Card: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const userData = parseResponse(response.data)
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem('userData');

    if (userDataFromLocalStorage) {
      const userData = JSON.parse(userDataFromLocalStorage);
      setUser(userData);
    } else {
      fetchUserData();
    }
    
  }, []);

  return (
    <CardContainer>
      <CardTitle>{user?.name || 'Loading...'}</CardTitle>
      <CardContent>{user?.email || 'Loading...'}</CardContent>
      <button onClick={fetchUserData}>Refresh</button>
    </CardContainer>
  );
};

export default Card;

