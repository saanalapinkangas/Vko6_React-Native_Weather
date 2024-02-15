import { FontAwesome6 } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import * as Location from 'expo-location'
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from 'react-native'
import Weather from './Weather'

export default function Position() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('Retrieving location...')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            console.log(status)
            try {
                if (status !== 'granted') {
                    setMessage('Permission to access location was denied')
                }
                else {
                    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Location retrieved')
                }
            } catch (error) {
                setMessage('There was an error retrieving the location')
                console.log(error)
            }
            setIsLoading(false)
        })()
    }, [])

    const [loaded] = useFonts({
        PlayfairDisplayRegular: require('../assets/PlayfairDisplay.ttf'),
        PlayfairDisplayItalic: require('../assets/PlayfairDisplay-Italic.ttf'),
        Fredoka: require('../assets/Fredoka.ttf'),
      })
      if (!loaded) {
        return null
      }

    return (
        <View style={styles.container2}>
            <Text style={styles.location}><FontAwesome6 name="map-location-dot" size={30} color="#f5ebe0" /></Text>
            <Text
                style={styles.location1}>{latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
            <Text
                style={styles.location2}>{message}</Text>
            {isLoading === false &&
                <Weather latitude={latitude} longitude={longitude} />
            }
        </View>
            )
}

const styles = StyleSheet.create({
    container2:{
        backgroundColor: '#B2C8BA',
        width: 280,
        height: 130,
        alignItems: 'center',
        borderRadius: 100,
        marginTop: 0,
        paddingTop: 20,
        borderWidth: 1,
        borderColor: '#889D8F',
    },
    location: {
        marginBottom: 15,
        textAlign: 'center',
    },
    location1:{
        color: '#4c4c4c',
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 16,
        fontFamily: 'Fredoka',
    },
    location2:{
        color: '#557760',
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'PlayfairDisplayRegular',
    },
})