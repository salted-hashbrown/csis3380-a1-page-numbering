import { users } from './data.js';

console.log(users);

// fetching from api online, parse results, push to users array
fetch('https://randomuser.me/api/?results=22')
    .then(response => response.json())
    .then(data => {
        console.log(data);
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

        console.log('updated users');
        console.log(users);

    })
    .catch(error => {
        console.log('Error:', error);
    });