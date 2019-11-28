import React from 'react';
import Button from 'react-bootstrap/Button';

function NumPad(props) {
  return (
    <React.Fragment>
        <div>
            <Button value="9" onClick={e => props.onSelect(e.target.value)}>9</Button>
            <Button value="8" onClick={e => props.onSelect(e.target.value)}>8</Button>
            <Button value="7" onClick={e => props.onSelect(e.target.value)}>7</Button>
        </div>
        <div>
            <Button value="6" onClick={e => props.onSelect(e.target.value)}>6</Button>
            <Button value="5" onClick={e => props.onSelect(e.target.value)}>5</Button>
            <Button value="4" onClick={e => props.onSelect(e.target.value)}>4</Button>
        </div>
        <div>
            <Button value="3" onClick={e => props.onSelect(e.target.value)}>3</Button>
            <Button value="2" onClick={e => props.onSelect(e.target.value)}>2</Button>
            <Button value="1" onClick={e => props.onSelect(e.target.value)}>1</Button>
        </div>   
        <div>
            <Button value="0" onClick={e => props.onSelect(e.target.value)}>0</Button>
        </div> 
        <div>
            <Button variant="danger" onClick={e => props.onReset()}>Reset</Button>
            <Button variant="success" onClick={e => props.onValid()}>Valider</Button>
        </div>
    </React.Fragment>
  );
}

export default NumPad;
