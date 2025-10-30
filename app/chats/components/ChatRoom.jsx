'use client'

import React, { useState, useEffect, useRef } from 'react';
import { db, rtdb } from '@/app/firebaseconfig';
import { collection, addDoc, query, where, getDocs, limit, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { ref, push, onChildAdded, off, onValue } from 'firebase/database';
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function ChatRoom() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [maxUsers, setMaxUsers] = useState(5);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchRooms().catch(err => setError(err.message));
  }, []);

  useEffect(() => {
    if (currentRoom) {
      const messagesRef = ref(rtdb, `messages/${currentRoom.id}`);
      onChildAdded(messagesRef, (snapshot) => {
        const message = snapshot.val();
        setMessages((prevMessages) => [...prevMessages, message]);
      }, (error) => {
        setError(`Error fetching messages: ${error.message}`);
      });

      return () => {
        off(messagesRef);
      };
    }
  }, [currentRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchRooms = async () => {
    try {
      const roomsCollection = collection(db, 'rooms');
      const unsubscribe = onSnapshot(roomsCollection, (snapshot) => {
        const roomsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRooms(roomsList);
      });
      return unsubscribe;
    } catch (err) {
      setError(`Error fetching rooms: ${err.message}`);
    }
  };

  const createRoom = async () => {
    if (roomName && maxUsers > 0) {
      try {
        const roomsRef = collection(db, 'rooms');
        await addDoc(roomsRef, {
          name: roomName,
          maxUsers: maxUsers,
          currentUsers: 0,
          activeUsers: []
        });
        setRoomName('');
        setMaxUsers(5);
        setIsDialogOpen(false);
      } catch (err) {
        setError(`Error creating room: ${err.message}`);
      }
    }
  };

  const joinRoom = async (room) => {
    if (room.currentUsers < room.maxUsers) {
      try {
        const roomRef = doc(db, 'rooms', room.id);
        await updateDoc(roomRef, {
          currentUsers: room.currentUsers + 1,
          activeUsers: [...(room.activeUsers || []), username]
        });
        setCurrentRoom(room);
        setMessages([]);
      } catch (err) {
        setError(`Error joining room: ${err.message}`);
      }
    } else {
      alert('This room is full');
    }
  };

  const leaveRoom = async () => {
    if (currentRoom) {
      try {
        const roomRef = doc(db, 'rooms', currentRoom.id);
        await updateDoc(roomRef, {
          currentUsers: currentRoom.currentUsers - 1,
          activeUsers: (currentRoom.activeUsers || []).filter(user => user !== username)
        });
        setCurrentRoom(null);
        setMessages([]);
      } catch (err) {
        setError(`Error leaving room: ${err.message}`);
      }
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && currentRoom) {
      const messagesRef = ref(rtdb, `messages/${currentRoom.id}`);
      push(messagesRef, {
        text: newMessage,
        sender: username,
        timestamp: Date.now()
      });
      setNewMessage('');
    }
  };

  const handleSetUsername = () => {
    if (username.trim()) {
      setIsUsernameSet(true);
    } else {
      setError("Please enter a valid username");
    }
  };

  if (!isUsernameSet) {
    return (
      <Card className="p-6 bg-[#F9FDF7] rounded-lg overflow-hidden">
        <h2 className="text-2xl font-medium text-[#314328] mb-4">Welcome to Anonymous Chat Rooms</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleSetUsername} className="bg-[#314328] text-white">Set Username</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-[#F9FDF7] rounded-lg overflow-hidden">
      <h2 className="text-2xl font-medium text-[#314328] mb-4">Anonymous Chat Rooms</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!currentRoom ? (
        <div>
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Logged in as: {username}</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#314328] text-white">Create New Room</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Chat Room</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roomName" className="text-right">
                      Room Name
                    </Label>
                    <Input
                      id="roomName"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maxUsers" className="text-right">
                      Max Users
                    </Label>
                    <Input
                      id="maxUsers"
                      type="number"
                      value={maxUsers}
                      onChange={(e) => setMaxUsers(parseInt(e.target.value))}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={createRoom} className="bg-[#314328] text-white">Create Room</Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <Card key={room.id} className="p-4 bg-white">
                <h3 className="text-lg font-medium text-[#314328] mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-2">Users: {room.currentUsers}/{room.maxUsers}</p>
                <p className="text-gray-600 mb-2">Active Users: {(room.activeUsers || []).join(', ') || 'None'}</p>
                <Button onClick={() => joinRoom(room)} className="bg-[#314328] text-white">Join</Button>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-medium text-[#314328] mb-4">Room: {currentRoom.name}</h3>
          <p className="text-gray-600 mb-2">Active Users: {(currentRoom.activeUsers || []).join(', ') || 'None'}</p>
          <div className="h-64 overflow-y-auto mb-4 p-4 bg-white rounded-lg">
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <span className="font-bold">{message.sender}: </span>
                <span>{message.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-grow mr-2"
            />
            <Button onClick={sendMessage} className="bg-[#314328] text-white">Send</Button>
          </div>
          <Button onClick={leaveRoom} className="mt-4 bg-[#314328] text-white">Leave Room</Button>
        </div>
      )}
    </Card>
  );
}

