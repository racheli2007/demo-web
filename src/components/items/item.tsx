import '../subjects/subjects.module.css';
import './items.css';
import { useHistory } from "react-router-dom";

export const Item = (props: { image: string;image1:string; name: string,price:string }) => {
    const history = useHistory();
    var src: string = props.image1;
    function handleClick() {
        history.push("/details" ,{'image':props.image, 'image2':props.image1, 'name':props.name, 'price':props.price}
         );
    }
    return (
        <div className='item d-flex flex-column' onClick={handleClick}>
            <img className='itemImg' alt={props.name}  onClick={handleClick}src={src} />
            <span onClick={handleClick} className='itemName'>{props.name}</span>
            <span onClick={handleClick}  className='itemPrice'>US${props.price}</span>
        </div>)
}