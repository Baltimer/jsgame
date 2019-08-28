const writeEvent = (text) => {
  const body = document.querySelector('body');
  const p = document.createElement('p');
  p.innerHTML = text;
  body.appendChild(p);
}

const addButtonListeners = () => {
  ['atack', 'dodge', 'fireball'].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
      socket.emit('action', id);
    })
  })
}

const socket = io();

socket.on('message', writeEvent);

addButtonListeners()
