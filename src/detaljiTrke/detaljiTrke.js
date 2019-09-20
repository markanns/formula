import React from 'react';
import '../css/main.css';
import '../css/boje.css';
import '../css/ram.css';
import '../css/tabela.css';
import $ from 'jquery';
import history from '../history';
import home from '../img/home.png';
import loder from '../img/logo.gif';
import Flag from 'react-flagkit';
import { FaExternalLinkAlt } from "react-icons/fa";
let godina ='';

class DetaljiTrke extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qualifications: [],
            result: [],
            flags: [],
            isLoading: true,
            
        }
        this.getAllData = this.getAllData.bind(this);
        this.getNotFound=this.getNotFound.bind(this);
    }



    componentDidMount() {
        //this.getResult();
        //this.getFlags();
        //this.getQualifications();
        this.getAllData();
    }

    /*getQualifications() {
            var url = `http://ergast.com/api/f1/2013/${this.props.match.params.id}/qualifying.json`;
            $.get(url, (data) => {
                this.setState({
                    qualifications: data.MRData.RaceTable.Races[0].QualifyingResults,
                    isLoading: false
                });
                
            })
        }

        
    getResult() {
    var url = `http://ergast.com/api/f1/2013/${this.props.match.params.id}/results.json`;
    $.get(url, (data) => {
        this.setState({
            result: data.MRData.RaceTable.Races,
            isLoading1: false });
            
        })
   }

   getFlags() {
        var url = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        $.get(url, (data) => {
            var ispis = JSON.parse(data);
            this.setState({ flags: ispis });
        })
        
    }*/
    getNotFound(){
        let linkTo='/NotFound'
        history.push(linkTo);
    }
    getAllData() {
         godina = this.props.match.params.year;
        var firstCall = $.ajax(`http://ergast.com/api/f1/${godina}/${this.props.match.params.id}/qualifying.json`);
        var secondCall = $.ajax(`http://ergast.com/api/f1/${godina}/${this.props.match.params.id}/results.json`);
        var thirdCall = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");

        $.when(firstCall, secondCall, thirdCall).done(function (data1, data2, data3) {
            var ispis = JSON.parse(data3[0]);
           if(data1[0].MRData.RaceTable.Races[0]!==undefined){
               this.setState({
                qualifications: data1[0].MRData.RaceTable.Races[0].QualifyingResults,
                result: data2[0].MRData.RaceTable.Races,
                flags: ispis,
                isLoading: false
            });
           }else{
               this.getNotFound();
           }
            
        }.bind(this));
    }


    render() {
        if (this.state.isLoading) {
            return <img src={loder} className='loderIkonica'/>
        }


        let prix = this.state.result.round;

        return (
            <div className='main'>
                <div className="header1">
                    <button className='dugme'><img src={home} alt='kucica' className='ikonica' />F-1 Feeder</button>
                </div>


                <div className='mainDetalji'>
                    <div className='OVozacu'>
                        <div className='vozac'>
                            <div className='zastavaIme'>
                                {this.state.flags.map((zastava,i) => {
                                    let skracenica = zastava.alpha_2_code;
                                    if (this.state.result[0].Circuit.Location.country === zastava.en_short_name) {
                                        return <Flag country={skracenica} key={i}/>
                                    }

                                    if (this.state.result[0].Circuit.Location.country === "UK") {
                                        if (zastava.nationality === "British, UK") {
                                            return <Flag country="GB" />
                                        }
                                    }

                                    if (this.state.result[0].Circuit.Location.country === "Korea") {
                                        if (zastava.nationality === "South Korean") {
                                            return <Flag country="KR" />
                                        }
                                    }

                                    if (this.state.result[0].Circuit.Location.country === "UAE") {
                                        if (zastava.nationality === "Emirati, Emirian, Emiri") {
                                            return <Flag country="AE" />
                                        }
                                    }
                                    if (this.state.result[0].Circuit.Location.country === "USA") {
                                        if (zastava.en_short_name === "United States of America") {
                                            return <Flag country="US" />
                                        }
                                    }
                                }
                                )}
                                <h4>{this.state.result.raceName}</h4>
                            </div>

                        </div>


                        <div className='info'>
                            <div><p>Country:</p><p>Location:</p><p>Date:</p><p>FullReport:</p></div>
                            <div><p>{this.state.result[0].Circuit.Location.country}</p>
                                <p>{this.state.result[0].Circuit.Location.locality}</p>
                                <p>{this.state.result[0].date}</p>
                                <p className="biografija">
                                    <a href={this.state.result[0].url} target="_blank"><FaExternalLinkAlt /></a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <table className='tabela'>
                        <thead>
                            <tr><th colSpan='4'>Formula1 Results</th></tr>
                            <tr><th>Pos</th><th>Driver</th><th>Team </th><th>Best Time</th></tr>
                        </thead>
                        <tbody >
                            {this.state.qualifications.map((raceStats, i) => {
                                let info = raceStats;
                                let time = [];
                                time.push(info.Q1);
                                time.push(info.Q2);
                                time.push(info.Q3);
                                let vreme = time.sort();
                                return (
                                    <tr key={i}>
                                        <td>{info.position}</td>
                                        <td className='celija'>{this.state.flags.map((zastava,i) => {
                                            let skracenica = zastava.alpha_2_code;
                                            if (info.Driver.nationality == zastava.nationality) {
                                                return <Flag country={skracenica} key={i}/>
                                            }

                                            if (info.Driver.nationality == "British") {
                                                if (zastava.nationality == "British, UK") {
                                                    return <Flag country="GB" key={i}/>
                                                }
                                            }

                                            if (info.Driver.nationality == "Dutch") {
                                                if (zastava.nationality == "Dutch, Netherlandic") {
                                                    return <Flag country="NL" key={i}/>
                                                }
                                            }
                                        }

                                        )}

                                            {info.Driver.familyName}</td>
                                        <td>{info.Constructor.name}</td>
                                        <td>{vreme[0]}</td >
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                        <tfoot>
                            <tr className='blank_row'>
                                <td colSpan='4'>&nbsp; </td>
                            </tr>
                        </tfoot>
                    </table>

                    <table className='tabela'>
                        <thead><tr><th colSpan='5'>Formula1 results</th></tr>
                            <tr><th>Pos</th><th>Driver</th><th>Team</th><th>Results</th><th>Points</th></tr>
                        </thead>
                        <tbody>
                            {this.state.result[0].Results.map((raceStats, i) => {
                                let info = raceStats;
                                let vreme = "";
                                if (info.status == "Finished") {
                                    vreme = info.Time.time;
                                } else {
                                    if (info.status.charAt(0) == "+") {
                                        vreme = info.status;
                                    } else {
                                        vreme = "Not Finished";
                                    }
                                }
                               
                                return (
                                    <tr key={i}>
                                        <td>{info.position}</td>
                                        <td className='celija'>
                                            {this.state.flags.map((zastava,i) => {
                                                let skracenica = zastava.alpha_2_code;
                                                if (info.Driver.nationality === zastava.nationality) {
                                                    return <Flag country={skracenica} key={i} />
                                                }
                                                if (info.Driver.nationality === "British") {
                                                    if (zastava.nationality === "British, UK") {
                                                        return <Flag country="GB" key={i}/>
                                                    }
                                                }
                                                if (info.Driver.nationality === "Dutch") {
                                                    if (zastava.nationality === "Dutch, Netherlandic") {
                                                        return <Flag country="NL" key={i}/>
                                                    }
                                                }
                                            }
                                            )}
                                            {info.Driver.familyName}</td>
                                        <td>{info.Constructor.name}</td>
                                        <td>{vreme}</td>
                                        <td>{info.points}</td>

                                    </tr>

                                )
                            })
                            }
                        </tbody>
                        <tfoot>
                            <tr className='blank_row'>
                                <td colSpan='5'>&nbsp;</td>
                            </tr></tfoot>
                    </table>

                </div>
            </div>


        );

    }

}

export default DetaljiTrke;


