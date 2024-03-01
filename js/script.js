let usersData = [];

window.onload = function() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        usersData = data;
        displayUsers(usersData);
    })
    .catch(error =>{
        const userListDiv = document.getElementById('user-list');
        userListDiv.innerHTML = `<p class="error-msg">${error.message}</p>`;
    });
}

function displayUsers(users) {
    const userListDiv = document.getElementById('user-list');
    userListDiv.innerHTML = '';

    users.forEach(user => {
        const userDiv = document.createElement('div');
        const userDivHidden = document.createElement('div');
        let numPhone = user.phone.split(' '); 
        userDiv.classList.add('user');
        userDiv.innerHTML = `
            <div class="user-hidden">
                <h2 class="user__h2">${user.name}</h2>
                <p class="user__email">Почта: ${user.email}</p>
                <p class="user___phone">Телефон: ${numPhone[0]}</p>
            </div>
        `;
        userListDiv.appendChild(userDiv);
    });
}

function sortUsers() {
    const sortBy = document.getElementById('sort-select').value;
    usersData.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    });
    displayUsers(usersData);
}

function filterUsers() {
    const filterBy = document.getElementById('filter-input').value.toLowerCase();
    const filteredUsers = usersData.filter(user => {
        return user.name.toLowerCase().includes(filterBy) || 
               user.email.toLowerCase().includes(filterBy);
    });
    displayUsers(filteredUsers);
}