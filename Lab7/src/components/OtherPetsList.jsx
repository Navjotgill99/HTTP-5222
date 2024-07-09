// Importing necessary hooks and components
import { useState } from 'react';
import Pet from './Pet';

// Initial array of other pets
var otherPetsArray = [
    {
        name: "Tweety",
        desc: "A cheerful yellow canary",
        age: 1,
        image: "https://th.bing.com/th/id/OIP.7Fq6PmQJCICGTs6QYnOcigHaE7?w=256&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
        name: "Hopper",
        desc: "An energetic rabbit",
        age: 2,
        image: "https://wallpapercave.com/wp/1B76Pm2.jpg"
    },
    {
        name: "Speedy",
        desc: "A slow but steady turtle",
        age: 3,
        image: "https://th.bing.com/th/id/R.aa95b36dc9c4543e61900d0a625712ef?rik=ywrCHM5xhgBTZg&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fe%2fea%2fBaby_turtle.jpg&ehk=EV9CegIvtdw6mZiDMIdMXnnzYNQIydQQ3SSaXMzOQgU%3d&risl=&pid=ImgRaw&r=0"
    }
];

// OtherPetsList component to display and add other pets
export default function OtherPetsList() {
    const [otherPetsList, setOtherPetsList] = useState(otherPetsArray);

    // Function to handle form submission
    function handleForm(e) {
        e.preventDefault();
        let newPet = {
            name: e.target.name.value,
            desc: e.target.desc.value,
            age: parseInt(e.target.age.value),
            image: e.target.image.value
        };
        setOtherPetsList([...otherPetsList, newPet]);
    }

    return (
        <section>
            <h2>Other Pets</h2>
            {/* Form to add a new pet */}
            <form onSubmit={handleForm}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="e.g. Goldie" required />
                <label htmlFor="desc">Description:</label>
                <input type="text" id="desc" name="desc" placeholder="e.g. Friendly goldfish" required />
                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" placeholder="e.g. 1" required />
                <label htmlFor="image">Image URL:</label>
                <input type="text" id="image" name="image" placeholder="https://example.com/image.jpg" required />
                <button type="submit">Add Pet</button>
            </form>
            <div className="pet-list">
                {
                    otherPetsList.map((pet, index) => (
                        <Pet
                            key={index}
                            name={pet.name}
                            desc={pet.desc}
                            age={pet.age}
                            image={pet.image}
                        />
                    ))
                }
            </div>
        </section>
    );
}
