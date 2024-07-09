// Importing necessary hooks and components
import { useState } from 'react';
import Pet from './Pet';

// Initial array of cats
var catsArray = [
    {
        name: "Whiskers",
        desc: "A playful tabby cat",
        age: 2,
        image: "https://th.bing.com/th/id/OIP.v8EW8JJFxh2m1A5fTRuaOAHaEf?w=319&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
        name: "Mittens",
        desc: "A calm and cuddly cat",
        age: 3,
        image: "https://www.rd.com/wp-content/uploads/2021/01/cute-ginger-cat-lies-on-woman-s-hands-the-fluffy-pet-comfortably-settled-to-sleep-or-to-play-cute-cozy-background-with-place-for-text-morning-bedtime-at-home-e1609877911762.jpg?resize=1536"
    },
    {
        name: "Shadow",
        desc: "A shy black cat",
        age: 1,
        image: "https://www.petsforpatriots.org/wp-content/uploads/2017/05/Kathryn-Luna_3_720x450-700x438.jpg"
    }
];

// CatList component to display and add cats
export default function CatList() {
    const [catList, setCatList] = useState(catsArray);

    // Function to handle form submission
    function handleForm(e) {
        e.preventDefault();
        let newCat = {
            name: e.target.name.value,
            desc: e.target.desc.value,
            age: parseInt(e.target.age.value),
            image: e.target.image.value
        };
        setCatList(
            [
                ...catList,
                newCat
            ]
        );
    }

    return (
        <section>
            <h2>Cats</h2>
            {/* Form to add a new cat */}
            <form onSubmit={handleForm}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="e.g. Luna" required />
                <label htmlFor="desc">Description:</label>
                <input type="text" id="desc" name="desc" placeholder="e.g. Playful and affectionate" required />
                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" placeholder="e.g. 2" required />
                <label htmlFor="image">Image URL:</label>
                <input type="text" id="image" name="image" placeholder="https://example.com/image.jpg" required />
                <button type="submit">Add Cat</button>
            </form>
            <div className="pet-list">
                {
                    catList.map((cat, index) => (
                        <Pet
                            key={index}
                            name={cat.name}
                            desc={cat.desc}
                            age={cat.age}
                            image={cat.image}
                        />
                    ))
                }
            </div>
        </section>
    );
}
