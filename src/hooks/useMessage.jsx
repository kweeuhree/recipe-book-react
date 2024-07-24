import { useState } from 'react';

const useMessage = () => {
    // initialize state to store new recipe status message
  const [message, setMessage] = useState('');

  // handle update status message
  const updateMessage = (newMessage) => {
    setMessage(newMessage);
  }

  return [message, updateMessage];
};

export default useMessage;
