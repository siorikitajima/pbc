import { ref } from 'vue'

const getProject = (slug) => {
    const project = ref([])
    const projecterror = ref(null)

    const loadProject = async () => {
        try {
            let data = await fetch('http://localhost:9000/api/project/' + slug)
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