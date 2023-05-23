import { users } from './data.js';

// console.log(users);

const itemPerPage = 10;

// fetching from api online, parse results, push to users array
fetch('https://randomuser.me/api/?results=22')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        // const test = data.results[0].name.first;
        // console.log(test);
        const fetchedUsers = [];
        for (const result of data.results) {
            const name = result.name.first + ' ' + result.name.last;
            // console.log(name);
            const image = result.picture.thumbnail;
            // console.log(image);
            const date = new Date(result.registered.date);
            const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
            // console.log(formattedDate);
            const userObject = {
                name: name,
                image: image,
                joined: formattedDate
            };
            users.push(userObject);
        }

        // console.log('updated users');
        // console.log(users);

        // total user count
        const pageHeaderUserCountString = document.querySelector('.page-header h3');
        // console.log(pageHeaderUserCountString);
        pageHeaderUserCountString.innerHTML += `${users.length}`;

        // pagination

        const pageCount = Math.ceil(users.length / itemPerPage);
        // console.log(`page count: ${pageCount}`);
        const pagination = document.querySelector('.pagination');
        // console.log(pagination.innerHTML);
        for (let i = 0; i < pageCount; i++) {
            pagination.innerHTML += `<li><a href="#")">` + (i + 1) + `</a></li>`;
        }

        // populate contact list view
        function loadContactList(pageNumber) {
            // console.log(`page number: ${pageNumber}`);
            const contactList = document.querySelector('.contact-list');
            // console.log(contactList.innerHTML);
            contactList.innerHTML = '';
            for (let i = 0; i < itemPerPage; i++) {
                const j = (pageNumber - 1) * itemPerPage + i;
                contactList.innerHTML += `<li class="contact-item cf">
                    <div class="contact-details">
                        <img class="avatar" src="${users[j].image}">
                        <h3>${users[j].name}</h3>
                        <span class="email">${users[j].name.replaceAll(' ', '.') + '@example.com'}</span>
                    </div>
                    <div class="joined-details">
                        <span class="date">Joined ${users[j].joined}</span>
                    </div>
                    </li>`;
                // console.log(contactList.innerHTML);
            }
        }

        loadContactList(1);

        const paginationLinks = document.querySelectorAll('.pagination li a');

        paginationLinks.forEach((link, index) => {
            link.addEventListener('click', (event) => {
                // event.preventDefault();
                const pageNumber = index + 1;
                loadContactList(pageNumber);
            });
        });

    })
    .catch(error => {
        console.log('Error:', error);
    });

