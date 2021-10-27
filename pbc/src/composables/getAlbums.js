import { ref } from 'vue'
import API_URL from '../../src/api-url'

const getAlbums = () => {
    const albums = ref([])
    const albumserror = ref(null)

    const loadAlbums = async () => {
        try {
            let data = await fetch( API_URL + 'albums')
            if(!data.ok) {
                throw Error ('no data available')
            }
            albums.value = await data.json()
        }
        catch(err) {
            albumserror.value = err.message
            console.log(albumserror.value)
        }
    }

    return { albums, albumserror, loadAlbums }
}

export default getAlbums