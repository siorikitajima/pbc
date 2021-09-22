import { ref } from 'vue'

const getSongs = () => {
    const songs = ref([])
    const error = ref(null)

    const load = async () => {
        try {
            let data = await fetch('http://localhost:9000/api/songs')
            if(!data.ok) {
                throw Error ('no data available')
            }
            songs.value = await data.json()
        }
        catch(err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { songs, error, load }
}

export default getSongs