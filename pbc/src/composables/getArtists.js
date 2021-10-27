import { ref } from 'vue'
import API_URL from '../../src/api-url'

const getArtists = () => {
    const artists = ref([])
    const artistserror = ref(null)

    const loadartists = async () => {
        try {
            let data = await fetch( API_URL + 'artists')
            if(!data.ok) {
                throw Error ('no data available')
            }
            artists.value = await data.json()
        }
        catch(err) {
            artistserror.value = err.message
            console.log(artistserror.value)
        }
    }

    return { artists, artistserror, loadartists }
}

export default getArtists