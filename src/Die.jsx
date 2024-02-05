import { nanoid } from "nanoid";
export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    let diceFaceClassName = '';
    switch (props.value) {
        case 1:
            diceFaceClassName = 'dice--first-face'
            break;
        case 2:
            diceFaceClassName = 'dice--second-face'
            break;
        case 3:
            diceFaceClassName = 'dice--third-face'
            break;
        case 4:
            diceFaceClassName = 'dice--fourth-face'
            break;
        case 5:
            diceFaceClassName = 'dice--fifth-face'
            break;
        case 6:
            diceFaceClassName = 'dice--sixth-face'
            break;
    
        default:
            break;
    }
    const diceDots = [];
    for (let i = 1; i <= props.value; i++) {
        diceDots.push(<span className="dice--dot"></span>);
    }
    return (
        <button 
            className={`die ${diceFaceClassName}`} 
            style={styles}  
            onClick={props.holdDie} 
        >
            {diceDots}
        </button>        
    )
}