import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import io, { Socket } from 'socket.io-client';
import { request } from '@/shared/lib/axios';
import { AuthStore } from '@/entities/auth';
import { dateFormat } from '@/shared/lib/date';

const CHAT_ID = 1;
const SOCKET_URL = 'http://10.0.2.2:8000';

interface Message {
  id: number;
  user_id: number;
  content: string;
  chat_id: number;
  createdAt: string;
  user: {
    id: number,
    firstName: string,
    lastName: string,
    avatar: string | null,
    groupName: string,
    studentNumber: string,
  };
}

const ChatView: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const user = AuthStore.instance.user;

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    const getMessages = async () => {
      try {
        const response = await request.post<Message[]>(`/chat/messages`, {
          chat_id: CHAT_ID,
        });
        setMessages(response.data ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    getMessages();

    newSocket.on('receiveMessage', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (input.trim() === '' || !user) return;

    const message = {
      user_id: user.id,
      content: input,
      chat_id: CHAT_ID,
    };

    if (socket) {
      socket.emit('sendMessage', message);
    }

    setInput('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.content + item.user_id}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <View style={styles.messageContainer}>
              <Text style={styles.userName}>
                {item.user.firstName} {item.user.lastName} {item.user.groupName}
              </Text>
              <Text>{dateFormat(item?.createdAt)}</Text>
            </View>
            <Text style={styles.messageContent}>{item.content}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={input}
        placeholder={'Введите сообщение'}
        onChangeText={setInput}
        onSubmitEditing={handleSendMessage}
      />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
  },
  message: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  userName: {
    fontWeight: 'bold',
  },
  messageContent: {
    marginTop: 5,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ChatView;
