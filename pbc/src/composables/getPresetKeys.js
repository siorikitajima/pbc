import { ref } from 'vue'

const getPresetKeys = () => {
    const presets = ref([])
    const preseterror = ref(null)

    const loadPresetKeys = async () => {
        try {
            let data = await fetch('http://localhost:9000/api/preset')
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