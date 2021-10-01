import { ref } from 'vue'

const getArtists = () => {
    const artists = ref([])
    const artistserror = ref(null)

    const loadartists = async () => {
        try {
            let data = await fetch('http://localhost:9000/api/artists')
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