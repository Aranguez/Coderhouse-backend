const socket = io.connect();

const render = data => {
  const html = data.map((elem, index) => {
    return (
      `<div class="message">
				<strong>${elem.author}</strong>:
				<em>${elem.message}</em>
			</div>`)
  }).join(' ');
  document.querySelector('#messages').innerHTML = html;
};

const renderAdd = data => {
  const html = `
		<strong>${data.author}</strong>:
		<em>${data.message}</em>
	`
  const div = document.createElement('div')
  div.innerHTML = html
  document.querySelector('#messages').append(div);
};

const addMessage = async () => {
  try {
    const message = {
      author: document.querySelector('#author').value,
      message: document.querySelector('#message').value
    };

    socket.emit('new-message', message);

    await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: message.author,
        message: message.message
      })
    });
  } catch (error) {
    console.error('Error al persistir el mensaje')
  }
}

socket.on('messages', data => {
  render(data);
})
socket.on('messages-push', data => {
  renderAdd(data);
})