const socket=io("http://localhost:8000");

const form=document.getElementById('send');
const messageInp=document.getElementById('messageInp');
const messageConatiner=document.querySelector('.container');
var audio=new Audio('tone.mp3');
var conversation=new Audio('conversation.mp3');
// conversation
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.className=`flex-${position}`;
    const innerMessage=document.createElement('div');
    innerMessage.innerText=message;
    innerMessage.classList.add('message');
    innerMessage.classList.add(`${position}`);
    messageElement.appendChild(innerMessage);
    messageConatiner.appendChild(messageElement);
    conversation.play();
    console.log("sound played converation");
}
// audio
const appends=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.className=`flex-${position}`;
    const innerMessage=document.createElement('div');
    const bold=document.createElement('b');
    bold.innerText=message;
    innerMessage.appendChild(bold);
    innerMessage.classList.add('message');
    innerMessage.classList.add(`${position}`);
    messageElement.appendChild(innerMessage);
    messageConatiner.appendChild(messageElement);
    audio.play();
    console.log("sound played audio");

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInp.value;
    append(`You: ${message}`,"right");
    socket.emit('send',message);
    messageInp.value="";
})

const naam=prompt("Enter your name");
socket.emit('new-user-joined',naam);

socket.on('user-joined',name=>{
    appends(`${name} joined the chat`,"right")
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})
socket.on('left',name=>{
    appends(`${name} left the chat`,'left');
})

