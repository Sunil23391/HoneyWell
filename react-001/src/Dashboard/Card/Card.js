
import './Card.css';
export const Card = ({name,url}) => {
    return (
        <div className="card">
            <h1>
                {name}
            </h1>
        </div>
    )
}