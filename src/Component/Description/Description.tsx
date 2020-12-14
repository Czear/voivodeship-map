import React from 'react'

import './Description.scss'

import { combineElementClasses, spacesToKebabCase } from 'Tool/string'
import { IRoot as IVoivodeshipData, IVoivodeshipName } from 'VoivodeshipData'

interface IProps {
    className?: string
    activeVoivodeship?: IVoivodeshipName
}

const Description = (componentProps: IProps): JSX.Element => {
    const VOIVODESHIP_DATA = require('Data/voivodeship.json') as IVoivodeshipData

    return (
        <div className={ combineElementClasses('description__container', componentProps.className ?? '') }>
            <h4>
                { componentProps.activeVoivodeship ? 'We are available in:' : 'Please, select a map tile for detailed localization informations' }
            </h4>
            { componentProps.activeVoivodeship &&
            <ul className="description">
                { VOIVODESHIP_DATA[ componentProps.activeVoivodeship ].localizations.map((location, index) => (
                    <li key={ `${ index }-${ spacesToKebabCase(location) }` }>
                        { location }
                    </li>
                )) }
            </ul>

            }
        </div>
    )
}

export default Description