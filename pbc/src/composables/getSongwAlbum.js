import { ref } from 'vue'
import API_URL from '../../src/api-url'

const getSongwAlbum = (id) => {
    const songAlbum = ref('')
    const songAlbumerror = ref(null)
    const tempAlbum = ref('')
    const tempArtists = ref('')

    const songAlbumload = async () => {
        try {
            let data = await fetch(API_URL + 'songs/' + id)
            if(!data.ok) { throw Error ('no data available') }
            songAlbum.value = await data.json()
            
            let temp = await songAlbum.value.CatNum
            let adata = await fetch(API_URL + 'albums/' + temp)
            if(!adata.ok) { throw Error ('no data available') }
            tempAlbum.value = await adata.json()

            let writers = await songAlbum.value.Writers.split(", ")
            let imageLinks = []
            let ardata = await fetch(API_URL + 'artists')
            if(!ardata.ok) { throw Error ('no data available') }
            tempArtists.value = await ardata.json()

            for(let a = 0; a < tempArtists.value.length; a++) {
                for(let ar = 0; ar < writers.length; ar++ ) {
                    if ( tempArtists.value[a].ArtistName.toLowerCase().replace(' ', '') == writers[ar].toLowerCase().replace(' ', '')) {
                        imageLinks[ar] = tempArtists.value[a].Img
                    }
                }
            }

            let albumYear = await tempAlbum.value[0].Year
            songAlbum.value.Year = albumYear
            songAlbum.value.WriterImg = imageLinks
        }
        catch(err) {
            songAlbumerror.value = err.message
            console.log(songAlbumerror.value)
        }
    }

    return { songAlbum, songAlbumerror, songAlbumload }
}

export default getSongwAlbum