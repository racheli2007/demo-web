type Props = {
  touch:boolean;
  number: Number | string;
  onClick: any;
  order: number;
};

export const DialerPadBtn = (props: Props) => {
  const {touch, number, onClick, order } = props;

 
  return (
    <button className={touch?"numberBtn numberBtnTouch":"numberBtn"} onClick={onClick} style={{ order: order }} 
 >
      {number}
    </button>
  );
};