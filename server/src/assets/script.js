const CHAT_ID = 1;
const app = () => {
  const socket = io(`http://localhost:8000`);
  const msgInput = document.querySelector('.message-input');
  const msgList = document.querySelector('.messages-list');
  const sendBtn = document.querySelector('.send-btn');
  const messages = [];

  const getMessages = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/chat/messages',
        {
          chatId: CHAT_ID,
        },
      );

      renderMessages(data);

      data.forEach((item) => messages.push(item));
    } catch (error) {
      console.log(error.message);
    }
  };

  getMessages();

  const handleSendMessage = (text) => {
    if (!text.trim()) {
      return;
    }

    const userId = Math.floor(Math.random() * 3) + 1;

    sendMessage({
      user_id: userId,
      content: text,
      chat_id: CHAT_ID,
    });

    msgInput.value = '';
  };

  msgInput.addEventListener(
    'keydown',
    (e) => e.keyCode === 13 && handleSendMessage(e.target.value),
  );

  sendBtn.addEventListener('click', () => handleSendMessage(msgInput.value));

  const renderMessages = (data) => {
    let messages = '';

    data.forEach(
      (message) =>
        (messages += `
        <li class='bg-dark p-2 rounded mb-2 d-flex justify-content-between message'>
            <div class='mr-2'>
                <span class='text-info'>${message.user.firstName} ${message.user.lastName}</span>
                <p class='text-light'>${message.content}</p>
            </div>
            <span class='text-muted text-right date'>
               ${message.chat_id}
            </span>
        </li>`),
    );

    msgList.innerHTML = messages;
  };

  const sendMessage = (message) => socket.emit('sendMessage', message);

  socket.on('receiveMessage', (message) => {
    messages.push(message);
    console.log(messages, 'render', message);
    renderMessages(messages);
  });
};

app();
