import React from 'react';
import '../css/main.css';
import '../css/ram.css';
import home from '../img/home.png';
import history from '../history';

class NotFound extends React.Component {
    

    // backToHome = (e) => {
    //     let linkTo = "/pocetna";
    //     history.push(linkTo);
    // }


    render() { 
        return ( 

            <div className='main'>
            <div className="header1">
                <button className='dugme'><img src={home} alt='kucica' className='ikonica' onClick={this.backToHome} />F-1 Feeder</button>
            </div>
            <h1>Data empty</h1>
            </div>
    );
    }
}
 
export default NotFound;