import { ref } from 'vue'

const getSong = (id) => {
    const song = ref('')
    const songerror = ref(null)

    const songload = async () => {
        try {
            let data = await fetch('http://localhost:9000/api/songs/' + id)
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