import { Platform } from 'react-native'

export default {
    fontFamily: Platform.OS == 'ios' ? 'Helvetica' : 'sans-serif',
    colors: {
        primary: '#BBE1FA',
        secundary: '#0F4C75',
        itens: '#3282B8',
        title: '#1B262C'
    }
}