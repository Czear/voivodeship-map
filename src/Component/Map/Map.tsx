import React from 'react'

import './Map.scss'

import { IRoot as IMapData } from 'MapData'
import { IVoivodeshipName } from 'VoivodeshipData'

interface IProps {
    className?: string
    activeVoivodeship?: IVoivodeshipName
    updateSelectedVoivodeship: Function
}

const Map = (componentProps: IProps): JSX.Element => {
    const activePathClass = 'active'
    const MAP_DATA = require('Data/map.json') as IMapData

    const mapClickHandler = (event: React.MouseEvent) => {
        if (!( event.target instanceof SVGPathElement )) {
            return
        }

        componentProps.updateSelectedVoivodeship(event.target.dataset.key as IVoivodeshipName)
    }

    return (
        <div onClick={ mapClickHandler } className={ componentProps.className }>

            <svg { ...MAP_DATA.props } className="map">

                <g { ...MAP_DATA.group.props }>

                    { MAP_DATA.paths.map((pathProps, index) => (
                        <path { ...pathProps } key={ `${ index }-${ pathProps[ 'data-key' ] }` }
                              className={ pathProps[ 'data-key' ] === componentProps.activeVoivodeship ? activePathClass : '' }/> ),
                    ) }

                </g>
            </svg>
        </div>
    )
}

export default Map