import React from 'react';
import '../css/main.css';
import '../css/boje.css';
import '../css/tabela.css';
import '../css/ram.css';
import $ from 'jquery';
import home from '../img/home.png';
import loder from '../img/logo.gif';
import vetel from '../img/drivers/Sebastian_Vettel.jpg';
import stig from '../img/drivers/White_Stig.jpg';
import Flag from 'react-flagkit';
import{urlVozaca} from "../vozaci/vozaci.js";
import { FaExternalLinkAlt } from "react-icons/fa";
var godina= '';

class DetaljiVozaca extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driver: [],
            flags: [],
            isLoading: true
        }
    }
    componentDidMount() {
        this.getDriver();
        this.getFlags();
    }
    getDriver() {
         godina= this.props.match.params.year;
        var url = `http://ergast.com/api/f1/${godina}/drivers/${this.props.match.params.id}/results.json`;
        $.get(url, (data) => {
            this.setState({ driver: data.MRData.RaceTable.Races, isLoading: false });
        })

    }

    getFlags() {
        var url = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        $.get(url, (data) => {
            var ispis = JSON.parse(data)
            this.setState({ flags: ispis });
        })
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


                <div className='mainDetalji'>
                    <div className='OVozacu'>

                        <div className='vozac'>
                            <div className='zastavaIme'>
                                <div>
                                    <img src={stig} width='70px' alt='slika vozaca' />
                                </div>
                                <div>

                                    {this.state.flags.map((zastava,i) => {
                                        let skracenica = zastava.alpha_2_code;
                                        if (this.state.driver[0].Results[0].Driver.nationality === zastava.nationality) {
                                            return <Flag country={skracenica} key={i} />
                                        }
                                        if (this.state.driver[0].Results[0].Driver.nationality === "Dutch") {
                                            if (zastava.nationality === 'Dutch, Netherlandic') {
                                                return <Flag country="NL" />
                                            }
                                        }
                                        if (this.state.driver[0].Results[0].Driver.nationality === "British") {
                                            if (zastava.nationality === 'British, UK') {
                                                return <Flag country="GB" />
                                            }
                                        }
                                    })}


                                    <h4 className='ime'>{this.state.driver[0].Results[0].Driver.givenName}</h4>
                                    <h4 className='ime'>{this.state.driver[0].Results[0].Driver.familyName}</h4>
                                </div>
                            </div>
                            <div className='info'>
                                <div><p>Country:</p><p>Team:</p><p>Birth:</p><p>Biography:</p></div>
                                <div><p>{this.state.driver[0].Results[0].Driver.nationality}</p>
                                    <p >{this.state.driver[0].Results[0].Constructor.name}</p>
                                    <p>{this.state.driver[0].Results[0].Driver.dateOfBirth}</p>
                                    <p className='biografija'>< a href={this.state.driver[0].Results[0].Driver.url} target='_blank' rel="noopener noreferrer"><FaExternalLinkAlt /></a></p>
                                </div>
                            </div>
                        </div>


                    </div>
                    <table className='tabela'>
                        <tbody>
                            <tr>
                                <th colSpan='5'>Formula F1-{godina} Results</th>
                            </tr>
                            <tr><th>Round</th><th>Grand Prix</th><th>Team</th><th>Grid</th><th>Race</th></tr>
                            {this.state.driver.map((driverStats, i) => {
                                let info = driverStats;
                                let position = '_'+info.Results[0].position;
                                return (
                                    <tr key={i}>

                                        <td width='50px'>{info.round}</td>
                                        <td  className='celija'>
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
                                            {info.raceName}
                                        </td>
                                        <td>{info.Results[0].Constructor.name}</td>
                                        <td>{info.Results[0].grid}</td>
                                        <td className={position}>{
                                            info.Results[0].position
                                            }</td>
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
            </div>

        );
    }
}

export default DetaljiVozaca;