import { ref } from 'vue'
import API_URL from '../../src/api-url'

const getSearchKeys = () => {
    const searchKeys = ref([])
    const error = ref(null)

    const loadSearchKeys = async () => {
        try {
            let data = await fetch( API_URL + 'search')
            if(!data.ok) {
                throw Error ('no data available')
            }
            searchKeys.value = await data.json()
        }
        catch(err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { searchKeys, error, loadSearchKeys }
}

export default getSearchKeys