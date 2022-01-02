import './subjects.module.css';
import { useHistory } from "react-router-dom";

export const Item = (props: { src: string; name: string,price:string }) => {
    const history = useHistory();
    var src: string = props.src;
    function handleClick() {
        history.push("/" + props.name, props.name);
    }
    return (
        <div onClick={handleClick}>
            <img alt={props.name} src={src} />
            <span>{props.name}</span>
            <span>{props.price}</span>
        </div>)
}