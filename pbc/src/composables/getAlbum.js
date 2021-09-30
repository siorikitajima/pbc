import { ref } from 'vue'

const getAlbum = (id) => {
    const album = ref([])
    const albumerror = ref(null)

    const loadAlbum = async () => {
        try {
            let data = await fetch('http://localhost:9000/api/albums/' + id)
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