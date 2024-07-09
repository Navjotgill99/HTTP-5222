// Pet component to display individual pet details
export default function Pet(props) {
    return (
        <div className="pet">
            <img src={props.image} alt={props.name} />
            <p className="name">{props.name}</p>
            <p>{props.desc}</p>
            <p>Age: {props.age} years</p>
        </div>
    );
}