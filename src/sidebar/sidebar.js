import React from 'react';
import logo from '../img/praviLogo.jpg';
import '../css/main.css';
import '../css/sidebar.css';
import helmet from '../img/helmet.png';
import timovi from '../img/timovi.png';
import flag from '../img/checkered-flag.png';
import Timovi from '../timovi/timovi.js';
import Vozaci from '../vozaci/vozaci.js';
import Trke from '../trke/trke.js';
import Pocetna from '../pocetna/pocetna.js';
import DetaljiVozaca from '../detaljiVozaca/detaljiVozaca.js';
import DetaljiTima from '../detaljiTima/detaljiTima.js';
import DetaljiTrke from '../detaljiTrke/detaljiTrke.js';
import NotFound from '../notFound/notFound';
import { Router, Route, NavLink } from 'react-router-dom';
import history from '../history';
import{godina} from '../pocetna/pocetna';

class Sidebar extends React.Component {

    constructor() {
        super();
        this.state={
            year:''
        }
        this.getYear=this.getYear.bind(this);
    }

    getYear(godina){
       this.setState({year:godina});
        
    }

 onClickDetailsOfRequest = (e) => {
        let linkTo = "/pocetna";
        history.push(linkTo);
    }

    render() {
        return (

            <Router history={history}>
                <div className='sidebar'>
                    <nav>
                        <NavLink exact to='/pocetna'><img src={logo} alt='slika logoa' className='slika_logoa' onClick={this.onClickDetailsOfRequest} /></NavLink>
                        <ul>
                            <li>
                                <NavLink to={'/vozaci/'+this.state.year} className='link' activeClassName="activeRoute">
                                    <span className='navigacija' >
                                        <img src={helmet} alt='slika logoa' className='ikonice helmet' />
                                        <h3>Drivers</h3>
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/teams/'+this.state.year} className='link' activeClassName="activeRoute">
                                    <span className='navigacija'>
                                        <img src={timovi} alt='slika logoa' className='ikonice' />
                                        <h3>Teams</h3>
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/trke/'+this.state.year} className='link' activeClassName="activeRoute">
                                    <span className='navigacija'>
                                        <img src={flag} alt='slika logoa' className='ikonice' />
                                        <h3>Races</h3>
                                    </span>
                                </NavLink>
                            </li>

                        </ul>
                    </nav>
                </div>
                <div className='ram'>
                    <Route path='/' exact component={()=><Pocetna getYear={this.getYear}/>} />
                    <Route path='/vozaci/:year' component={Vozaci} />
                    <Route path='/trke/:year' component={Trke} />
                    <Route path='/teams/:year' component={Timovi }/>
                    <Route path="/detaljiVozaca/:id/:year" component={DetaljiVozaca} />
                    <Route path="/detaljiTima/:id/:year" component={DetaljiTima} />
                    <Route path="/detaljiTrke/:id/:year" component={DetaljiTrke} />
                    <Route path="/pocetna"component={()=><Pocetna getYear={this.getYear}/>} />
                    <Route path="/NotFound" component={NotFound} />
                </div>
            </Router>
        );
    }
}
export default Sidebar;