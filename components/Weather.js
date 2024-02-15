import { useFonts } from 'expo-font'
import { useEffect, useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_API_ICONS
}

export default function Weather(props) {
    const [temp, setTemp] = useState(0)
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')


    useEffect(() => {
        const url = api.url +
            'lat=' + props.latitude +
            '&lon=' + props.longitude +
            '&units=metric' +
            '&appid=' + api.key

        fetch(url)
            .then(res => res.json())
            .then((json) => {
                console.log(json)
                setTemp(json.main.temp)
                setDescription(json.weather[0].description)
                setIcon(api.icons + json.weather[0].icon + '@2x.png')
            })
            .catch((error) => {
                setDescription('There was an error retrieving the weather')
                console.log(error)
            })
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
<View style={styles.container}>
            <Text
                style={styles.temp}>{temp} °C</Text>
            {icon &&
                <Image source={{ uri: icon }} style={{ width: 100, height: 100 }} />
            }
            <Text style={styles.desc}>{description}</Text>
        </View>
)
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#B2C8BA',
        width: 280,
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: 60,
        borderWidth: 1,
        borderColor: '#889D8F',
    },
    temp:{
        color: '#4c4c4c',
        fontSize: 20,
        fontFamily: 'Fredoka',
    },
    desc: {
        color: '#4c4c4c',
        textTransform: 'uppercase',
        fontSize: 18,
        fontFamily: 'Fredoka',
    },
})