import React from 'react';
import '../css/main.css';
import '../css/boje.css';
import '../css/ram.css';
import '../css/tabela.css';
import history from '../history';
import $ from 'jquery';
import home from '../img/home.png';
import loder from '../img/logo.gif';
import Flag from 'react-flagkit';
import { FaExternalLinkAlt } from "react-icons/fa";
let godina='';
class DetaljiTima extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            team:[],
            constructor:[],
            flags: [],
            isLoading1: true,
            isLoading2: true,
        }
        this.getNotFound=this.getNotFound.bind(this);
    }
    componentDidMount(){
        this.getTeam();
        this.getConstructor();
        this.getFlags();
    }
    getNotFound(){
        let linkTo='/NotFound'
        history.push(linkTo);
    }

    getTeam() {
     godina = this.props.match.params.year;
    var url = `https://ergast.com/api/f1/${godina}/constructors/${this.props.match.params.id}/results.json`;
   
    $.get(url, (data) => {
        // if(data.MRData.RaceTable.Races[0].Results.Driver!==undefined){
            this.setState({
    team: data.MRData.RaceTable.Races,
    isLoading1: false
        });
        // }else{
        //     this.getNotFound();
        // }
    
     })
    }

   getConstructor(){
    let godina = this.props.match.params.year;
    var url = `https://ergast.com/api/f1/${godina}/constructors/${this.props.match.params.id}/constructorStandings.json`;
    console.log(url);
    $.get(url, (data)=>{
        this.setState({
            constructor: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0],
            isLoading2: false
        });
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
            if (this.state.isLoading1 === true) {
                return <img src={loder} className='loderIkonica'/>
            }

            if (this.state.isLoading2 === true) {
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
                                         {this.state.flags.map((zastava,i) => {
                                            let skracenica = zastava.alpha_2_code;
                                            if (this.state.team[0].Results[0].Constructor.nationality === zastava.nationality) {
                                                return <Flag country={skracenica} key={i} />
                                            }
                                            if (this.state.team[0].Results[0].Constructor.nationality=== "Dutch") {
                                                if (zastava.nationality === 'Dutch, Netherlandic') {
                                                    return <Flag country="NL" key={i}/>
                                                }
                                            }
                                            if (this.state.team[0].Results[0].Constructor.nationality === "British") {
                                                if (zastava.nationality === 'British, UK') {
                                                    return <Flag country="GB" key={i}/>
                                                }
                                            }
                                        })}
                                    </div>
                                    <div>
                                        <h4 className='ime'>{this.state.team[0].Results[0].Constructor.name}</h4>
                                    </div>
                                </div>
                                <div className='info'>
                                    <div><p>Country:</p><p>Location:</p><p>Date:</p><p>FullReport:</p></div>
                                    <div><p>{this.state.team[0].Results[0].Constructor.nationality}</p>
                                        <p >{this.state.team[0].Results[0].position}</p>
                                        <p>{this.state.constructor.points}</p>
                                        <p className='biografija'>< a href={this.state.team[0].Results[0].Constructor.url} target='_blank'><FaExternalLinkAlt /></a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className='tabela'>
                            <tbody>
                                <tr>
                                    <th colSpan='5'>Formula1 {godina} Results</th>
                                </tr>
                                <tr><th>Round</th><th>Grand Prix</th><th>{this.state.team[0].Results[0]!==undefined?this.state.team[0].Results[0].Driver.familyName:'No data'}</th><th>{this.state.team[0].Results[1]!==undefined?this.state.team[0].Results[1].Driver.familyName:'No data'}</th><th>Points</th></tr>
                                {this.state.team.map((teamStats, i) => {
                                    let info = teamStats;
                                    let position='';
                                    let position1='';
                                    let points='';
                                    if(info.Results[0]!==undefined&&info.Results[1]!==undefined){
                                            let position = info.Results[0].position;
                                    let position1 = info.Results[1].position;
                                    let points = +info.Results[0].points + +info.Results[1].points;
                                    }
                                
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
                                            <td className={'_'+position}>{position}</td>
                                            <td className={'_'+position1}>{position1}</td>
                                            <td >{
                                                points
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
    export default DetaljiTima;

