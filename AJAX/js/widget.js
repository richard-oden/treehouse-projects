var employeesXhr = new XMLHttpRequest();
employeesXhr.onreadystatechange = function() {
  if (employeesXhr.readyState === 4) {
    var employees = JSON.parse(employeesXhr.responseText);
    var statusHTML = `<ul class="bulleted">`;
    for (var employee of employees) {
      statusHTML += `<li class="${employee.inoffice ? 'in' : 'out'}">${employee.name}</li>`;
    }
    statusHTML += `</ul>`;
    document.getElementById('employeeList').innerHTML = statusHTML;
  }
};
employeesXhr.open('GET', '../data/employees.json');
employeesXhr.send();

var roomsXhr = new XMLHttpRequest();
roomsXhr.onreadystatechange = function() {
  if (roomsXhr.readyState === 4) {
    var rooms = JSON.parse(roomsXhr.responseText);
    var statusHTML = `<ul class="rooms">`;
    for (var room of rooms) {
      statusHTML += `<li class="${room.available ? 'empty' : 'full'}">${room.room}</li>`;
    }
    statusHTML += `</ul>`;
    document.getElementById('roomList').innerHTML = statusHTML;
  }
};
roomsXhr.open('GET', '../data/rooms.json');
roomsXhr.send();