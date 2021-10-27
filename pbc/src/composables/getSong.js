import { ref } from 'vue'
import API_URL from '../../src/api-url'

const getSong = (id) => {
    const song = ref('')
    const songerror = ref(null)

    const songload = async () => {
        try {
            let data = await fetch( API_URL + 'songs/' + id)
            if(!data.ok) {
                throw Error ('no data available')
            }
            song.value = await data.json()
        }
        catch(err) {
            songerror.value = err.message
            console.log(songerror.value)
        }
    }

    return { song, songerror, songload }
}

export default getSong