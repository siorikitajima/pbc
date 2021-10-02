import { ref } from 'vue'

const getArtist = (slug) => {
    const artist = ref([])
    const artisterror = ref(null)

    const loadArtist = async () => {
        try {
            let data = await fetch('http://localhost:9000/api/artist/' + slug)
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