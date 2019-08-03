import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import io from 'socket.io-client';

export function useFetch(url, payload) {
  const [response,setResponse] = useState({ data: null, error: null});
  const sendData = useCallback(() => {
    axios
      .post(url, payload)
      .then(res => {
        setResponse(prevState => ({ ...prevState, data: res.data }));
      })
      .catch(error => {
        setResponse(prevState => ({ ...prevState, error: error }));
      });
  }, [url, payload]);
  return [response,sendData]
}

export function useSocket() {
  const socket = io.connect("http://localhost:3000/chat");
  const [message, setMessage] = useState([]);
  useEffect(() => {
    socket.on('message', msg => {
      setMessage(prevState => [...prevState, msg])
    })
    return () => socket.off('message')
  }, [message])
  const sendToSocket = input => {
    setMessage(prevState => [...prevState,]);
    socket.emit("input", input);
  }
  return [message, sendToSocket]
}
