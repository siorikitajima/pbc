import { ref } from 'vue'
import API_URL from '../../src/api-url'

const getProject = (slug) => {
    const project = ref([])
    const projecterror = ref(null)

    const loadProject = async () => {
        try {
            let data = await fetch( API_URL + 'project/' + slug)
            if(!data.ok) {
                throw Error ('no data available')
            }
            project.value = await data.json()
        }
        catch(err) {
            projecterror.value = err.message
            console.log(projecterror.value)
        }
    }

    return { project, projecterror, loadProject }
}

export default getProject