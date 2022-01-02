import './subjects.module.css';
import { useHistory } from "react-router-dom";

export const SubjectSignal = (props: { src: string; name: string }) => {
    const history = useHistory();
    var src: string = props.src;
    function handleClick() {
        history.push("/" + props.name, props.name);
    }
    return (
        <div onClick={handleClick}>
            <img alt={props.name} src={src} />
        </div>)
}