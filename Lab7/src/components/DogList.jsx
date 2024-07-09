// Importing necessary hooks and components
import { useState } from "react";
import Pet from "./Pet";

// Initial array of dogs
var dogsArray = [
    {
        name: "Buddy",
        desc: "A friendly golden retriever",
        age: 3,
        image: "https://th.bing.com/th/id/OIP.VNRuIH5tI3s1032z7Z7HpwHaEo?w=260&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
        name: "Max",
        desc: "An energetic border collie",
        age: 2,
        image: "https://th.bing.com/th/id/OIP.166eBEJ3YDlZteUmUrP-RQHaD4?w=319&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
        name: "Bella",
        desc: "A calm and gentle labrador",
        age: 4,
        image: "https://th.bing.com/th/id/OIP.18C1Q3v3I9kMe947J4BkZAHaE8?w=248&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    }
];

// DogList component to display and add dogs
export default function DogList() {
    const [dogList, setDogList] = useState(dogsArray);

    // Function to handle form submission
    function handleForm(e) {
        e.preventDefault();
        let newDog = {
            name: e.target.name.value,
            desc: e.target.desc.value,
            age: parseInt(e.target.age.value),
            image: e.target.image.value
        };
        setDogList(
            [
                ...dogList,
                newDog
            ]
        );
    }

    return (
        <section>
            <h2>Dogs</h2>
            {/* Form to add a new dog */}
            <form onSubmit={handleForm}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="e.g. Charlie" required />
                <label htmlFor="desc">Description:</label>
                <input type="text" id="desc" name="desc" placeholder="e.g. Playful and affectionate" required />
                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" placeholder="e.g. 2" required />
                <label htmlFor="image">Image URL:</label>
                <input type="text" id="image" name="image" placeholder="https://example.com/image.jpg" required />
                <button type="submit">Add Dog</button>
            </form>
            <div className="pet-list">
                {
                    dogList.map((dog, index) => (
                        <Pet
                            key={index}
                            name={dog.name}
                            desc={dog.desc}
                            age={dog.age}
                            image={dog.image}
                        />
                    ))
                }
            </div>
        </section>
    );
}