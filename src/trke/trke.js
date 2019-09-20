import React  from 'react';
import $ from 'jquery';
import home from '../img/home.png';
import '../css/main.css';
import '../css/tabela.css';
import '../css/ram.css';
import loder from '../img/logo.gif';
import history from '../history';
import Flag from 'react-flagkit';
import { godina } from '../vozaci/vozaci';


let year='';
class Trke extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            races:[], 
            drivers: [],
            flags: [],
            isLoading:true
        }
    }

    componentDidMount(){
        this.getRaces();
        this.getFlags();
        this.getDrivers();
    }

    getRaces(){
        year = godina;
        var url=`http://ergast.com/api/f1/${year}/results/1.json` ;
        $.get(url, (data)=>{
            this.setState({races:data.MRData.RaceTable.Races});
        })
    }

    getDrivers() {
        var url = `http://ergast.com/api/f1/${year}/driverStandings.json`;
        $.get(url, (data) => {
            this.setState({ drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
            isLoading:false });
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
        let linkTo = "/detaljiTrke/" + e.target.dataset.itemid+"/"+year;
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
            <h2>Race Calendar</h2>
            <table className='tabela'>
            <tbody>
                <tr><th colSpan='5'>Race Calendar-{year}</th>
                </tr>
                <tr><th>Round</th>
                    <th>Grad prix</th>
                    <th>Circut</th>
                    <th>Date</th>
                    
                    <th>Winner</th>
                </tr>
                {this.state.races.map((raceStats, i)=> {
                    let info = raceStats;
                    return (
                        
                        <tr key={i}>
                        <td>{info.round}</td>
                        <td className='celija'>
                        {this.state.flags.map((zastava,i) => {
                            let skracenica = zastava.alpha_2_code;
                            if (info.Circuit.Location.country === zastava.en_short_name) {
                                return <Flag country={skracenica} key={i}/>
                            }
                            if (info.Circuit.Location.country === "UK") {
                                if (zastava.nationality === "British, UK") {
                                    return <Flag country="GB" key={i}/>
                                }
                            }

                            if (info.Circuit.Location.country === "Korea") {
                                if (zastava.nationality === "South Korean") {
                                    return <Flag country="KR" key={i}/>
                                }
                            }
                            if (info.Circuit.Location.country === "UAE") {
                                if (zastava.nationality === "Emirati, Emirian, Emiri") {
                                    return <Flag country="AE" key={i}/>
                                }
                            }
                            if (info.Circuit.Location.country === "USA") {
                                if (zastava.en_short_name === "United States of America") {
                                    return <Flag country="US" key={i}/>
                                }
                            }
                        }
                        )}
                        < button className='vozaciDugme' type='button' onClick={this.onClickDetailsOfRequest} data-itemid={info.round}>{info.raceName}</button></td>
                        <td>{info.Circuit.circuitName}</td>
                        <td>{info.date}</td>
                        <td className='celija'>                
                        {this.state.flags.map((zastava,i)=>{
                                        let skracenica = zastava.alpha_2_code;
                                        if(info.Results[0].Driver.nationality===zastava.nationality){
                                            return <Flag country={skracenica} key={i}/>
                                        }
                                        if(info.Results[0].Driver.nationality==="Dutch"){
                                            if(zastava.nationality==='Dutch, Netherlandic'){
                                                return <Flag country = "NL" key={i}/>
                                            }
                                        }
                                        if(info.Results[0].Driver.nationality==="British"){
                                            if(zastava.nationality==='British, UK'){
                                                return <Flag country = "GB" key={i}/>
                                            }
                                        }
                                    })}
                        {info.Results[0].Driver.familyName}</td>
                        </tr>
                    )
                })
                }
                
                
                </tbody>
                <tfoot>
                        <tr className='blank_row'>
                            <td colSpan='5'>&nbsp;</td>
                        </tr>
                    </tfoot>
               </table>
            </div>
        );
    }

}

export default Trke;