import React from 'react'
import { IRoot as IVoivodeshipData, IVoivodeshipName } from 'VoivodeshipData'

import './Slider.scss'
import { combineElementClasses } from 'Tool/string'

type IOneDimensionDirections = 'left' | 'right'

interface IProps {
    className?: string
    activeVoivodeship: IVoivodeshipName
}

interface IState {
    activeSlideIndex: number
}

export default class Slider extends React.PureComponent<IProps, IState> {
    private readonly VOIVODESHIP_DATA = require('Data/voivodeship.json') as IVoivodeshipData
    private readonly sliderRootClassname = 'slider'

    public state: IState = {
        activeSlideIndex: 0
    }

    /* Lifecycle */
    public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        /* Reset starting slide index if props were changed */

        if(JSON.stringify(prevProps) === JSON.stringify(this.props)) {
            return
        }

        this.setActiveSlideIndex();
    }

    /* Tools */
    private setActiveSlideIndex(index: number = 0) {
        this.setState({
            activeSlideIndex: index
        })
    }

    private changeSlide(direction:IOneDimensionDirections) {
        const slidesAmount = this.VOIVODESHIP_DATA[ this.props.activeVoivodeship ].photos.length - 1
        const incrementValue = (direction === 'left' ? -1 : 1);
        let newActiveSlideIndex = this.state.activeSlideIndex + incrementValue;

        if(newActiveSlideIndex < 0){
            newActiveSlideIndex = slidesAmount;
        } else if (newActiveSlideIndex > slidesAmount) {
            newActiveSlideIndex = 0
        }

        this.setActiveSlideIndex(newActiveSlideIndex)
    }

    /* Elements generation */
    private  manageArrowElement(orientation: IOneDimensionDirections): JSX.Element {
        /* No slides - no arrow */
        if(!this.VOIVODESHIP_DATA[ this.props.activeVoivodeship ].photos.length){
            return
        }

        return <img onClick={ this.changeSlide.bind(this, orientation) } className={ `arrow arrow--${ orientation }` } src={ require(`Asset/Icon/arrow-${ orientation }-solid.svg`).default } alt={ `arrow-${ orientation }` }/>
    }

    private get sliderContent(): JSX.Element {
        const slidesPhotos = this.VOIVODESHIP_DATA[ this.props.activeVoivodeship ].photos

        /* No photos */
        if (!slidesPhotos.length) {
            return <h5 className="slider__no-photos">This voivodeship section has no photos</h5>
        }

        const getSlideElement = (assetName: string): JSX.Element => {
            const altAttr = assetName.replace(/\..*?$/, '')

            return <img className="slider__photo" src={ require(`Asset/slider/${ assetName }`).default } alt={ altAttr }/>
        }

        return <React.Fragment>
            { getSlideElement(slidesPhotos[this.state.activeSlideIndex]) }
        </React.Fragment>
    }

    public render() {
        return <section className={ combineElementClasses(this.props.className, `${ this.sliderRootClassname }__container`) }>

            { this.manageArrowElement('left') }
                { this.sliderContent }
            { this.manageArrowElement('right') }

        </section>
    }
}