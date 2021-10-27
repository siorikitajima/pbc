import { ref } from 'vue'
import API_URL from '../../src/api-url'

const getAlbum = (id) => {
    const album = ref([])
    const albumerror = ref(null)

    const loadAlbum = async () => {
        try {
            let data = await fetch( API_URL + 'albums/' + id)
            if(!data.ok) {
                throw Error ('no data available')
            }
            album.value = await data.json()
        }
        catch(err) {
            albumerror.value = err.message
            console.log(albumerror.value)
        }
    }

    return { album, albumerror, loadAlbum }
}

export default getAlbum