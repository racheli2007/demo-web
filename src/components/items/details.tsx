import '../subjects/subjects.module.css';
import './items.css';
import Select from 'react-select'
import { useHistory, useLocation } from "react-router-dom";
import bottom from "../../assets/images/bottom.png"
import prudacrtDetails from "../../assets/images/prudacrtDetails.png"
import { ItemType } from './items';
import boys3 from "../../assets/images/boys3.png"
// import details from "../../assets/images/details.png"

var boys:ItemType=
    {image:boys3,image2:boys3, name:'Flecked rib sweater',price:'39.99'};

    const kidsSizes = [
        { value: '5', label: '5(43in)' },
        { value: '6', label: '6(46in)' },
        { value: '7', label: '7(48in)' },
        { value: '8', label: '8(50in)' },
        { value: '9', label: '9(53in)' },
        { value: '10', label: '10(455in)' },
        { value: '11-12', label: '11-12(60in)' },
        { value: '13-14', label: '13-14(65in)' },
      ]
      

export const Details = (props: { src1: string; src2:string, name: string,price:string, code:string }) => {
    const history = useHistory();
    
  const location = useLocation();
    var prudact = location.state as ItemType;
    function handleClick() {
        history.push("/" + props.name, props.name);
    }
    return (
        <div>
        <div className='d-flex'>
            <img className='ImgDetails p2' alt={prudact.name} src={prudact.image} />
            <img className='ImgDetails p2' alt={prudact.name} src={prudact.image2} />
            <div className='p2 details'>
            {/* <img className='p2' alt={boys.name} src={details} /> */}
            <span  className='itemName nameDetails'                         >{prudact.name}</span>
            <span  className='itemPrice priceDetails'>{prudact.price}</span>
            <label>
          Choose your size
        <Select  options={kidsSizes} /></label>
            <button className='addBtn'>Add to shopping bag</button>
               <img className='prudacrtDetails' src={prudacrtDetails} alt=''/>

            </div>
            </div>      <img className='bottom' src={bottom} alt=''/>

        </div>)
}