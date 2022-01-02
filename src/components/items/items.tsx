// import './subjects.module.css';
import { useHistory, useLocation } from "react-router-dom";
import { Item } from './item';
import { type } from 'os';

import boys1 from "../../assets/images/boys1.png"
import boys2 from "../../assets/images/boys2.png"
import boys3 from "../../assets/images/boys3.png"
import babygirl11 from "../../assets/images/babygirl11.png"
import babygirl21 from "../../assets/images/babygirl21.png"
import babygirl31 from "../../assets/images/babygirl31.png"
import babygirl41 from "../../assets/images/babygirl41.png"
import babygirl51 from "../../assets/images/babygirl51.png"
import babygirl61 from "../../assets/images/babygirl61.png"


export type ItemType={
image:string;
image2:string;
name:string;
price:string;
}

var boys:ItemType[]=[
    {image:boys1,image2:boys1,name:'Flecked rib sweater',price:'39.99'},
    {image:boys2,image2:boys2,name:'Flecked rib sweater',price:'39.99'},
    {image:boys3,image2:boys3,name:'Flecked rib sweater',price:'39.99'},
    {image:boys3,image2:boys3,name:'Flecked rib sweater',price:'39.99'},
    {image:boys3,image2:boys3,name:'Flecked rib sweater',price:'39.99'},
    {image:boys3,image2:boys3,name:'Flecked rib sweater',price:'39.99'}
]
var girls:ItemType[]=[
    {image:babygirl11,image2:babygirl11,name:'Plumeti dress',price:'39.99'},
    {image:babygirl21,image2:babygirl21,name:'Hooded faux-fur coat',price:'45.99'},
    {image:babygirl31,image2:babygirl31,name:'Leopard faux-fur coatr',price:'45.99'},
    {image:babygirl41,image2:babygirl41,name:'Checked structured coat',price:'49.99'},
    {image:babygirl51,image2:babygirl51,name:'Embroidered cotton sweatshirt',price:'25.99'},
    {image:babygirl61,image2:babygirl61,name:'Cotton jogger-style trousers',price:'12.99'}
]
var babygirls:ItemType[]=[
    {image:babygirl11,image2:babygirl11,name:'Plumeti dress',price:'39.99'},
    {image:babygirl21,image2:babygirl21,name:'Hooded faux-fur coat',price:'45.99'},
    {image:babygirl31,image2:babygirl31,name:'Leopard faux-fur coatr',price:'45.99'},
    {image:babygirl41,image2:babygirl41,name:'Checked structured coat',price:'49.99'},
    {image:babygirl51,image2:babygirl51,name:'Embroidered cotton sweatshirt',price:'25.99'},
    {image:babygirl61,image2:babygirl61,name:'Cotton jogger-style trousers',price:'12.99'}
]

var babyBoys:ItemType[]=[
    {image:babygirl11,image2:babygirl11,name:'Plumeti dress',price:'39.99'},
    {image:babygirl21,image2:babygirl21,name:'Hooded faux-fur coat',price:'45.99'},
    {image:babygirl31,image2:babygirl31,name:'Leopard faux-fur coatr',price:'45.99'},
    {image:babygirl41,image2:babygirl41,name:'Checked structured coat',price:'49.99'},
    {image:babygirl51,image2:babygirl51,name:'Embroidered cotton sweatshirt',price:'25.99'},
    {image:babygirl61,image2:babygirl61,name:'Cotton jogger-style trousers',price:'12.99'}
]
var newborn:ItemType[]=[
    {image:babygirl11,image2:babygirl11,name:'Plumeti dress',price:'39.99'},
    {image:babygirl21,image2:babygirl21,name:'Hooded faux-fur coat',price:'45.99'},
    {image:babygirl31,image2:babygirl31,name:'Leopard faux-fur coatr',price:'45.99'},
    {image:babygirl41,image2:babygirl41,name:'Checked structured coat',price:'49.99'},
    {image:babygirl51,image2:babygirl51,name:'Embroidered cotton sweatshirt',price:'25.99'},
    {image:babygirl61,image2:babygirl61,name:'Cotton jogger-style trousers',price:'12.99'}
]

export const Items = (props: { src: string; name: string }) => {
    const history = useHistory();
    const location = useLocation();
    var products=location.pathname=='/girls'?girls:location.pathname=='/newborn'?newborn:location.pathname=='/babyGirls'?babygirls:location.pathname=='/babyBoys'?babyBoys:location.pathname=='/boys'?boys:boys;
    var src: string = props.src;
    function handleClick() {
        history.push("/" + props.name, products);
    }
    return (
        <div>
            <div className="d-flex align-items-end" >
           <div className="d-flex align-items-end"> <Item image={products[0].image} image1={products[0].image} name={boys[0].name} price={boys[0].price}/>   </div>
           <div className="d-flex align-items-end"><Item image={products[1].image} image1={products[1].image} name={products[1].name} price={boys[1].price}/> </div>
           <div className="d-flex align-items-end"><Item image={products[2].image} image1={products[2].image} name={products[2].name} price={products[2].price}/> </div>
           </div>
           <div className="d-flex align-items-end" >
           <div className="d-flex align-items-end"><Item  image={products[3].image} image1={products[3].image} name={products[3].name} price={products[3].price}/> </div>
           <div className="d-flex align-items-end"><Item  image={products[4].image} image1={products[4].image} name={products[4].name} price={products[4].price}/> </div>
           <div className="d-flex align-items-end"><Item  image={products[5].image} image1={products[5].image} name={products[5].name} price={products[5].price}/> </div>
            </div>
        </div>)
}