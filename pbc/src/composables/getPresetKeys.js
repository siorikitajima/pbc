import { ref } from 'vue'
import API_URL from '../../src/api-url'

const getPresetKeys = () => {
    const presets = ref([])
    const preseterror = ref(null)

    const loadPresetKeys = async () => {
        try {
            let data = await fetch( API_URL + 'preset')
            if(!data.ok) {
                throw Error ('no data available')
            }
            presets.value = await data.json()
        }
        catch(err) {
            preseterror.value = err.message
            console.log(error.value)
        }
    }

    return { presets, preseterror, loadPresetKeys }
}

export default getPresetKeys