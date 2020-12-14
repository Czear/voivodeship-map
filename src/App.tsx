/* React */
import React from 'react'
import ReactDOM from 'react-dom'

/* Styles */
import 'App.scss'

/* Components */
import Map from 'Component/Map/Map'
import Slider from 'Container/Slider/Slider'
import Description from 'Component/Description/Description'

/* Interfaces */
import { IVoivodeshipName } from 'VoivodeshipData'

interface IState {
    selectedVoivodeship: IVoivodeshipName
}

interface IProps {

}

class App extends React.Component<IProps, IState> {
    public state: IState = {
        selectedVoivodeship: undefined,
    }

    private updateSelectedVoivodeship(selectedVoivodeship: IVoivodeshipName) {
        this.setState((prevState) => {
            const stateCopy = { ...prevState }

            if (selectedVoivodeship === prevState.selectedVoivodeship) {
                stateCopy.selectedVoivodeship = undefined
            } else {
                stateCopy.selectedVoivodeship = selectedVoivodeship
            }


            return stateCopy
        })
    }

    public render() {
        return ( <main className="container main-container text-center">
            <h1 className="main-heading">Our stores</h1>

            <section className="row informations align-items-center flex-column-reverse flex-lg-row">
                <Description className="col-xs-12 col-lg-5" activeVoivodeship={ this.state.selectedVoivodeship }/>
                <Map className="col-xs-12 col-lg-5 offset-lg-2" activeVoivodeship={ this.state.selectedVoivodeship } updateSelectedVoivodeship={ this.updateSelectedVoivodeship.bind(this) }/>
            </section>

            { this.state.selectedVoivodeship && <Slider className="row justify-content-center align-items-center" activeVoivodeship={ this.state.selectedVoivodeship }/> }
        </main> )
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root'),
)