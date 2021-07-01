const axios = require('axios');
const btoa = require('btoa');
const users = [];

// Join user to chat
function userJoin( id, username, room) {
  const user = { id, username, room };

  users.push(user);
var data = JSON.stringify({
  "operation" : "insert",
  "schema" : "chatapp",
  "table" : "chat",
  "records" : [
    {
      "id" : Math.floor(Math.random() * 10000) + 1,
      "username" : user.username,
      "room" : user.room
    }
  ]
});
var username = "wittstack";
var password ="tobiloba97.";
var config = {
  method: 'post',
  url: 'https://us-east1-chatapp.harperdbcloud.com',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Basic '+ btoa(username+":"+password)
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  console.log(user.id);
 
})
.catch(function (error) {
  console.log(error);
});

return user;

}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);
 
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
