import { ref } from 'vue'
import API_URL from '../../src/api-url'

const getArtist = (slug) => {
    const artist = ref([])
    const artisterror = ref(null)

    const loadArtist = async () => {
        try {
            let data = await fetch( API_URL + 'artist/' + slug)
            if(!data.ok) {
                throw Error ('no data available')
            }
            artist.value = await data.json()
        }
        catch(err) {
            artisterror.value = err.message
            console.log(artisterror.value)
        }
    }

    return { artist, artisterror, loadArtist }
}

export default getArtist