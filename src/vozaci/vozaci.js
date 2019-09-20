import React from 'react';
import '../css/main.css';
import '../css/tabela.css';
import '../css/ram.css';
import $ from 'jquery';
import home from '../img/home.png';
import loder from '../img/logo.gif';
import history from '../history';
import Flag from 'react-flagkit';
let urlVozaca='';
let godina='2018';

class Vozaci extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drivers: [],
            flags: [],
            isLoading: true
        }
    }
    componentDidMount() {
        this.getDrivers();
        this.getFlags();
    }
    getDrivers() {
        godina= this.props.match.params.year;
        var url = `http://ergast.com/api/f1/${godina}/driverStandings.json`;
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
        let linkTo = "/detaljiVozaca/" + e.target.dataset.itemid+"/"+godina;
        urlVozaca=e.target.dataset.itemurl;
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
                <h2>Drivers Championsship Standings</h2>
                <table className='tabela'>
                    <tbody>
                        <tr>
                            <th colSpan='4'>Drivers Championsship Standings-{godina}</th>
                        </tr>
                        {this.state.drivers.map((driverStats, i) => {
                            let info = driverStats;
                            return (
                                <tr key={i}>
                                    <td width='50px'>{info.position}</td>
                                    <td className='celija'>
                                    {this.state.flags.map((zastava,i)=>{
                                        let skracenica = zastava.alpha_2_code;

                                        if(info.Driver.nationality === "American"){
                                            if(zastava.en_short_name==='United States of America'){
                                                return <Flag country = "US" key={i}/>
                                            }
                                        }

                                        if(info.Driver.nationality==="American"){
                                            return false;
                                        }else{
                                             if(info.Driver.nationality===zastava.nationality){
                                                return <Flag country={skracenica} key={i}/> 
                                        }
                                        }
                                      
                                        if(info.Driver.nationality==="Dutch"){
                                            if(zastava.nationality==='Dutch, Netherlandic'){
                                                return <Flag country = "NL" key={i}/>
                                            }
                                        }
                                        if(info.Driver.nationality==="British"){
                                            if(zastava.nationality==='British, UK'){
                                                return <Flag country = "GB" key={i} />
                                            }
                                        }

                                        if(info.Driver.nationality==="British"){
                                            if(zastava.nationality==='British, UK'){
                                                return <Flag country = "GB" key={i} />
                                            }
                                        }


                                        if(info.Driver.nationality==="Monegasque"){
                                            if(zastava.nationality==='Monégasque, Monacan'){
                                                return <Flag country = "MC" key={i} />
                                            }
                                        }

                                        if(info.Driver.nationality==="New Zealander"){
                                            if(zastava.nationality==='New Zealand, NZ'){
                                                return <Flag country = "NZ" key={i} />
                                            }
                                        }

                                        if(info.Driver.nationality==="Rhodesian"){
                                            if(zastava.nationality==='Zimbabwean'){
                                                return <Flag country = "ZW" key={i} />
                                            }
                                        }

                                        if(info.Driver.nationality==="Liechtensteiner"){
                                            if(zastava.nationality==='Liechtenstein'){
                                                return <Flag country = "LI" key={i} />
                                            }
                                        }

                                                               
                                    })}
                                        <button className='vozaciDugme' type='button' onClick={this.onClickDetailsOfRequest} data-itemid={info.Driver.driverId} data-itemurl={info.Driver.url} >
                                         {info.Driver.givenName} {info.Driver.familyName}</button></td>
                                    <td>{info.Constructors[0].name} </td>
                                    <td>{info.points}</td>
                                </tr>
                            )
                        })
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

export default Vozaci;
export {urlVozaca};
export {godina};