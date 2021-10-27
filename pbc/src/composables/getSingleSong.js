import { ref } from 'vue'
import API_URL from '../../src/api-url'

const getSingleSong = (id) => {
    const singlesong = ref('')
    const singlesongerror = ref(null)

    const singlesongload = async () => {
        try {
            let data = await fetch( API_URL + 'singlesong/' + id)
            if(!data.ok) {
                throw Error ('no data available')
            }
            singlesong.value = await data.json()
        }
        catch(err) {
            singlesongerror.value = err.message
            console.log(singlesongerror.value)
        }
    }

    return { singlesong, singlesongerror, singlesongload }
}

export default getSingleSong