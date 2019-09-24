import React from 'react';
import '../css/main.css';
import '../css/tabela.css';
import '../css/ram.css';
import $ from 'jquery';
import home from '../img/home.png';
import history from '../history';
import loder from '../img/logo.gif';
import Flag from 'react-flagkit';
import { FaExternalLinkAlt } from "react-icons/fa";
import { godina } from '../vozaci/vozaci';

let year='';
class Timovi extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            teams:[],
            flags: [],
            isLoading: true
        }

        this.getNotFound=this.getNotFound.bind(this);
    }
    componentDidMount(){
        this.getTeams();
        this.getFlags();
    }

    getNotFound(){
        let linkTo='/NotFound'
        history.push(linkTo);
    }
    
    getTeams(){
        year =godina;
         var url=`https://ergast.com/api/f1/${year}/constructorStandings.json`;
         
         $.get(url, (data)=>{
             if(data.MRData.StandingsTable.StandingsLists[0]!==undefined){
                 this.setState({teams:data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
            isLoading:false});
             }else{
                 this.getNotFound();
             }
             
         })
    }

    getFlags() {
        var url = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        $.get(url, (data) => {
            var ispis = JSON.parse(data)
            this.setState({ flags: ispis });
        })
    }

    onClickDetailsOfRequest = (e) => {
        let linkTo = "/detaljiTima/" + e.target.dataset.itemid+"/"+year;
        history.push(linkTo);
    }

    render() {
        
        if (this.state.isLoading === true) {
            return <img src={loder} className='loderIkonica'/>
        }
        return (
            
            <div className='main'>
            <div className="header1">
                <button className='dugme'><img src={home} alt='kucica' className='ikonica' />F-1 Feeder</button>
            </div>
            <h2>Constructors Championship</h2>
            
            <table className='tabela'>
            <tbody>
                
                <tr><th colSpan='4'>Constructors Championship{godina}</th>
                
                </tr>
                {this.state.teams.map((teamStats,i)=> {
                    let tim = teamStats;
                    return ( 
                        <tr key={i}>
                        <td  width='50px'>{tim.position}</td>
                        <td className='celija'>
                        {this.state.flags.map((zastava,i)=>{
                                        let skracenica = zastava.alpha_2_code;

                                         if(tim.Constructor.nationality === "American"){
                                            if(zastava.en_short_name==='United States of America'){
                                                return <Flag country = "US" key={i}/>
                                            }
                                        }    
                                            if(tim.Constructor.nationality==="American"){
                                            return false;
                                        }else{
                                             if(tim.Constructor.nationality===zastava.nationality){
                                                return <Flag country={skracenica} key={i}/> 
                                        }
                                        }


                                        if(tim.Constructor.nationality===zastava.nationality){
                                            return <Flag country={skracenica} key={i}/>
                                        }

                                        if(tim.Constructor.nationality==="Dutch"){
                                            if(zastava.nationality==='Dutch, Netherlandic'){
                                                return <Flag country = "NL" key={i}/>
                                            }
                                        }
                                        if(tim.Constructor.nationality==="British"){
                                            if(zastava.nationality==='British, UK'){
                                                return <Flag country = "GB" key={i}/>
                                            }
                                        }
                                    })}
                        < button className='vozaciDugme' type='button' onClick={this.onClickDetailsOfRequest} data-itemid={tim.Constructor.constructorId}>{tim.Constructor.name}</button>
                        </td>
                        <td >Details < a href={tim.Constructor.url} target='_blank'><FaExternalLinkAlt /></a></td>
                        <td>{tim.points}</td>
                        </tr>
                     )}
                )
                }
                </tbody>
                <tfoot>
                        <tr className='blank_row'>
                            <td colSpan='4'>&nbsp;</td>
                        </tr>
                    </tfoot>
               </table>
            </div>
        );
    }
}
 
export default Timovi;




