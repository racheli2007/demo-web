import './subjects.module.css';
import { useHistory } from "react-router-dom";
import { Item } from './item';
import { type } from 'os';

export type ItemType={
image:string;
name:string;
price:string;
}

var boys:ItemType[]=[
    {image:'',name:'',price:''}
]


export const Items = (props: { src: string; name: string }) => {
    const history = useHistory();
    var src: string = props.src;
    function handleClick() {
        history.push("/" + props.name, props.name);
    }
    return (
        <div>
            <Item  src={''} name={''} price={''}/>
        </div>)
}