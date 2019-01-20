import React from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    InfoWindow,
    BicyclingLayer
} from "react-google-maps"
import { Cacher } from 'services/cacher'

// function MapComponent(props) {
//     return (
//         <GoogleMap
//             defaultZoom={8}
//             defaultCenter={{ lat: -34.397, lng: 150.644 }}
//         >
//             <Marker
//                 position={{ lat: -34.397, lng: 150.644 }}
//             />
//         </GoogleMap>
//     )

// }

export const MapComponent = props => {
    const { coordinates, isError, isLocationLoaded} = props

    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={coordinates}
            center={coordinates}
            options={{disableDefaultUI: isError ? true : false}}
        >
        <div>
                {isLocationLoaded && !isError ? 
            <BicyclingLayer
            position={coordinates}
            radius={500}
            /> : 
            <InfoWindow position={coordinates} options = {{maxWidth: 300}}>  
            <div>
                Error problem in server retry or refresh after a while
            </div>
            </InfoWindow> 
            }
                {/* {isError && <InfoWindow position={coordinates}>  <div>
                    Error problem in server
                </div>
                </InfoWindow>} */}
        </div>
            
            
               
        </GoogleMap>
    )
} 

export const withGeocode = (MapComponent) => {
    return class extends React.Component{
        constructor(){
            super()

            this.cacher = new Cacher()
            this.state = {
                coordinates:{
                    lat: 0,
                    lng: 0
                },
                isError: false,
                isLocationLoaded: false
            }
            // geocodeLocation = this.geocodeLocation.bind(this)
        }
        componentDidMount(){
            this.getGeocodedLocation()
        }

        updateCoordinates(coordinates) {
            this.setState({
                coordinates,
                isLocationLoaded: true
            })
        }
        geoCodeLocation(location){
            const geocoder = new window.google.maps.Geocoder()
            return new Promise((resolve, reject) => {
                geocoder.geocode({ address: location }, (result, status) => {
                    if (status === 'OK') {
                        const geometry = result[0].geometry.location
                        const coordinates = { lat: geometry.lat(), lng: geometry.lng() }
                        this.cacher.cacheValue(location, geocoder)
                        
                        resolve(coordinates)
                    } else {
                        reject('Error')
                    }
                })
            })
        }
        getGeocodedLocation() {
            const location = this.props.location
            if(this.cacher.isValueCached(location)){
                this.setState({coordinates: this.cacher.getCachedValue(location), isLocationLoaded: true})
            } else {
                this.geoCodeLocation().then((coordinates) => {
                    this.setState({coordinates, isLocationLoaded: true})
                }).catch(error => { this.setState({isError: true})
            console.log('err')})
            }
        }
        render(){
            return(
                <MapComponent {...this.state} />
            )
        }
    }
}

export const MapWithGeoCode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));
