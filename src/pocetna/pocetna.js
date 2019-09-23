import React from 'react';
import '../css/pocetna.css';  
import history from '../history';

var godina= '';

class Pocetna extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            inputValue:''
        }
       this.selektovano=this.selektovano.bind(this);
    
    
    }

    selektovano(e){
         godina = e.target.value;
        this.setState({
            inputValue:e.target.value
        })
        let linkTo = "/vozaci/"+ e.target.value;
        this.props.getYear(e.target.value);
        history.push(linkTo);     
    
    }

    render() { 
            let datum = new Date();
            let godina = datum.getFullYear()-1;
            let listaGodina=[];
            for(let i = 1950;i<=godina;i++){
                listaGodina.push(i);
            }
            let godine = listaGodina.map((i)=>{return(<option value={i} key={i} >{i}</option>)})
    
        return (
            <div className='pocetnaStrana'>
            <div className='slika'></div>
            <div className='sadrzaj'><h1>Welcome to F1 Statistic</h1></div> 
            <div className='izbor'>
                <h2>Chose season</h2>
                <div>
                <select className='empty' onChange={this.selektovano}>
                <option value="" selected disabled>Please select</option>
                  {godine}
                </select> 
                
                </div>   
            </div> 
            </div>
            
        );
    }
}
 
export default Pocetna;
export {godina}