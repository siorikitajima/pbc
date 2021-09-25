import { ref } from 'vue'

const getSearchKeys = () => {
    const searchKeys = ref([])
    const error = ref(null)

    const loadSearchKeys = async () => {
        try {
            let data = await fetch('http://localhost:9000/api/songs')
            if(!data.ok) {
                throw Error ('no songs available')
            }
            let jsonData = await data.json()
            for(let k = 0; k < jsonData.length; k++) {
                let key = { "key":jsonData[k].Title, "type":"song" }
                searchKeys.value.push( key )
            }
        }
        catch(err) {
            error.value = err.message
            console.log(error.value)
        }

        try {
            let data = await fetch('http://localhost:9000/api/artists')
            if(!data.ok) {
                throw Error ('no artists available')
            }
            let jsonData = await data.json()
            for(let k = 0; k < jsonData.length; k++) {
                let key = { "key":jsonData[k].ArtistName, "type":"artist" }
                searchKeys.value.push( key )
            }
        }
        catch(err) {
            error.value = err.message
            console.log(error.value)
        }

        try {
            let data = await fetch('http://localhost:9000/api/albums')
            if(!data.ok) {
                throw Error ('no albums available')
            }
            let jsonData = await data.json()
            for(let k = 0; k < jsonData.length; k++) {
                let key = { "key":jsonData[k].Title, "type":"album" }
                searchKeys.value.push( key )
            }
        }
        catch(err) {
            error.value = err.message
            console.log(error.value)
        }

        // console.log(searchKeys.value)
    }

    return { searchKeys, error, loadSearchKeys }
}

export default getSearchKeys