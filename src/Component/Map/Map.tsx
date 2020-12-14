import React from 'react'

import './Map.scss'

import { IRoot as IMapData } from 'MapData'
import { IVoivodeshipName } from 'VoivodeshipData'
import { combineElementClasses } from "Tool/string";

interface IProps {
    className?: string
    activeVoivodeship?: IVoivodeshipName
    updateSelectedVoivodeship: Function
}

const Map = (componentProps: IProps): JSX.Element => {
    const activePathClass = 'active'
    const MAP_DATA = require('Data/map.json') as IMapData

    const pathClickHandler = (pathName: IVoivodeshipName) => {
        componentProps.updateSelectedVoivodeship(pathName)
    }

    return (
        <div className={ combineElementClasses(componentProps.className, 'map__container') }>

            <svg { ...MAP_DATA.props } className="map">

                <g { ...MAP_DATA.group.props }>

                    { MAP_DATA.paths.map((pathProps, index) => (
                        <path onClick={ pathClickHandler.bind(this, pathProps.name) } d={ pathProps.d } key={ `${ index }-${ pathProps.name }` }
                              className={ pathProps.name === componentProps.activeVoivodeship ? activePathClass : '' }/> ),
                    ) }

                </g>
            </svg>
        </div>
    )
}

export default Map