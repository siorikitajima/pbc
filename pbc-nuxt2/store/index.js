const axios = require('axios');
import baseURL from '~/assets/api-url.js'

let songsUrl = baseURL + `/songs`
let albumsUrl = baseURL + '/albums'
let artistsUrl = baseURL + '/artists'
let licenseUrl = baseURL + '/license'
let featArtistsUrl = baseURL + '/featartists'

export const state = () => ({
    windowWidth: null,
    songs: [],
    albums: [],
    artists: [],
    featArtists: [],
    ogSongID: '',
    tempSongIDs: [],

    filteredSongs: [],
    filter: {
        artist: [],
        project: [],
        album: [],
        order: 'Rate',
        search : [],
        song : [],
        instrument : [],
        genre : [],
        tag : [],
        mood : []
    },

    similarPanel: false,
    simSongGap: 1.5,
    simOG: [],
    simSonData: [],

    queuePanel: false,
    sqQueue: [],
    sqPlaying: ['PBS2002'],
    sqEnded: [],
    alsoPlay: 0,
    playerBar: true,

    singleSongPanel: false,
    singSonData: [],

    sideNavOpen: false,

    flashPanel: false,
    flashText: '',
    
    playlist: [],

    isTimerPlaying: false,

    rhythm : { min: 0, max: 10 },
    speed : { min: 0, max: 10 },
    experimental : { min: 0, max: 10 },
    mood : { min: 0, max: 10 },
    organic : { min: 0, max: 10 },
    density : { min: 0, max: 10 },
    search : '',
    allSearch : [],

    licensePanel: false,
    licenseData: { id: '', category: '', type: '', subType: '' },
    licenseSong: [],
    itemInCart: false,
    licenseDB: [],
    cart: [],
    cartPanel: false
});

export const mutations = {
    SET_WINDOWWIDTH: (state, num) => {
        state.windowWidth = num
    },
    SET_SONGS: (state, payload) => {
        state.songs = payload;
    },
    SET_ALBUMS: (state, payload) => {
        state.albums = payload;
    },
    SET_ARTISTS: (state, payload) => {
        state.artists = payload;
    },
    SET_FEATARTISTS: (state, payload) => {
        state.featArtists = payload;
    },
    SET_QUEUE: (state, payload) => {
        state.sqQueue = payload;
    },
    SET_PLAYING: (state, payload) => {
        state.sqPlaying = payload;
    },
    SET_ENDED: (state, payload) => {
        state.sqEnded = payload;
    },
    ADD_QUEUE: (state, id) => {
        let exist = state.sqQueue.some(qID => {
            return qID == id })
        if(!exist) {
        state.sqQueue.push(id)
        } 
    },
    CLOSE_QUEUE: (state) => {
        state.queuePanel = false
    },
    TOGGLE_QUEUE: (state) => {
        state.queuePanel = !state.queuePanel
        if(state.similarPanel && state.windowWidth <= 600) {
            state.similarPanel = false
            state.queuePanel = true
        }
        if(state.sideNavOpen) {
            state.sideNavOpen = false
            state.queuePanel = true
        }
    },
    MENU_OPEN: (state) => {
        state.sideNavOpen = true
    },
    MENU_CLOSE: (state) => {
        state.sideNavOpen = false
    },
    MENU_TOGGLE: (state) => {
        state.sideNavOpen = !state.sideNavOpen
        state.playerBar = true
    },
    CLOSE_SIMSON: (state) => {
        state.similarPanel = false
    },
    OPEN_SIMSON: (state, songs) => {
        state.simSonData = songs
        state.similarPanel = true
    },
    SET_SIMOGP: (state, song) => {
        state.simOG = song
    },
    SET_SIMOG: (state, id) => {
        state.ogSongID = id
    },
    SET_SINGSON_P: (state, song) => {
        state.singSonData = song
    },
    SET_PLAYLIST: (state, ids) => {
        state.playlist = ids
    },
    PLAY_NEXT: (state) => {
        let eExist = state.sqEnded.some(eID => {
            return eID == state.sqPlaying[0] })
        if(!eExist) {
        state.sqEnded.push(state.sqPlaying[0])
        }
        state.sqPlaying.splice(0, 1)
        state.sqPlaying.push(state.sqQueue[0])
        state.sqQueue.splice(0, 1)
        state.alsoPlay++
    },
    PLAY_GENERATED: (state, newID) => {
        state.sqEnded.push(state.sqPlaying[0])
        state.sqPlaying.splice(0, 1)
        state.sqPlaying.push(newID)
        state.alsoPlay++
    },
    PLAY_PREV: (state) => {
        if(state.sqEnded.length > 0) {
            state.sqQueue.unshift(state.sqPlaying[0])
            state.sqPlaying.splice(0, 1)
            state.sqPlaying.push(state.sqEnded[state.sqEnded.length - 1])
            state.sqEnded.splice(state.sqEnded.length - 1, 1)
            state.alsoPlay++
        }
    },
    PLAY_THIS: (state, id) => {
        let eExist = state.sqEnded.some(eID => {
            return eID == state.sqPlaying[0] })
        if(!eExist) {
        state.sqEnded.push(state.sqPlaying[0])
        }
        state.sqPlaying.splice(0, 1)
        state.sqPlaying.push(id)
        state.alsoPlay++
    },
    PLAY_SKIP: (state, id) => {
        let eExist = state.sqEnded.some(eID => {
            return eID == state.sqPlaying[0] })
        let index = state.sqQueue.indexOf(id)
        state.sqQueue.splice(index, 1)
        state.sqQueue.unshift(id)
        if(!eExist) {
        state.sqEnded.push(state.sqPlaying[0])
        }
        state.sqPlaying.splice(0, 1)
        state.sqPlaying.push(state.sqQueue[0])
        state.sqQueue.splice(0, 1)
        state.alsoPlay++
    },
    PLAY_ALL: (state, ids) => {
        const reversed = ids.reverse()
        for (let s = 0; s < reversed.length; s++) {
            let exist = state.sqQueue.some(qID => {
                return qID == reversed[s] })
            if(!exist) {
                state.sqQueue.unshift(reversed[s])
            }
          }
          state.sqEnded.push(state.sqPlaying[0])
          state.sqPlaying.splice(0, 1)
          state.sqPlaying.push(state.sqQueue[0])
          state.sqQueue.splice(0, 1)
          state.alsoPlay++
        ids = reversed.reverse()
    },
    ADD_ALL: (state, ids) => {
        for (let s = 0; s < ids.length; s++) {
            let exist = state.sqQueue.some(qID => {
                return qID == ids[s] })
            if(!exist) {
                state.sqQueue.push(ids[s])
            }
        }
    },
    ADD_ALL_AFTER_PLAY: (state, ids) => {
        const reversed = ids.reverse()
        for (let s = 0; s < reversed.length; s++) {
            let exist = state.sqQueue.some(qID => {
                return qID == reversed[s] })
            if(!exist) {
                state.sqQueue.unshift(reversed[s])
            }
          }
    },

    RMV_Q: (state, id) => {
        let index = state.sqQueue.indexOf(id)
        state.sqQueue.splice(index, 1)
    },
    RMV_E: (state, id) => {
        let index = state.sqEnded.indexOf(id)
        state.sqEnded.splice(index, 1);
    },
    RMV_ALL: (state) => {
        state.sqEnded.splice(0);
        state.sqQueue.splice(0);
    },

    OPEN_SING_SONG: (state) => {
        if(state.singleSongPanel) {
            state.singleSongPanel = false
        }
        state.singleSongPanel = true
    },
    CLOSE_SING_SONG: (state) => {
        state.singleSongPanel = false
    },

    FLASH_ON: (state, text) => {
        state.flashPanel = true
        state.flashText = text
    },
    FLASH_OFF: (state) => {
        state.flashPanel = false
        state.flashText = ''
    },

    IS_PLAYING_ON: (state) => {
        state.isTimerPlaying = true
    },
    IS_PLAYING_OFF: (state) => {
        state.isTimerPlaying = false
    },

    SET_RHY_MIN: (state, value) => {
        state.rhythm.min = value
    },
    SET_RHY_MAX: (state, value) => {
        state.rhythm.max = value
    },
    SET_RHY: (state, { min, max }) => {
        state.rhythm.min = min
        state.rhythm.max = max
    },
    SET_SPD_MIN: (state, value) => {
        state.speed.min = value
    },
    SET_SPD_MAX: (state, value) => {
        state.speed.max = value
    },
    SET_SPD: (state, { min, max }) => {
        state.speed.min = min
        state.speed.max = max
    },
    SET_EXP_MIN: (state, value) => {
        state.experimental.min = value
    },
    SET_EXP_MAX: (state, value) => {
        state.experimental.max = value
    },
    SET_EXP: (state, { min, max }) => {
        state.experimental.min = min
        state.experimental.max = max
    },
    SET_MOD_MIN: (state, value) => {
        state.mood.min = value
    },
    SET_MOD_MAX: (state, value) => {
        state.mood.max = value
    },
    SET_MOD: (state, { min, max }) => {
        state.mood.min = min
        state.mood.max = max
    },
    SET_ORG_MIN: (state, value) => {
        state.organic.min = value
    },
    SET_ORG_MAX: (state, value) => {
        state.organic.max = value
    },
    SET_ORG: (state, { min, max }) => {
        state.organic.min = min
        state.organic.max = max
    },
    SET_DNS_MIN: (state, value) => {
        state.density.min = value
    },
    SET_DNS_MAX: (state, value) => {
        state.density.max = value
    },
    SET_DNS: (state, { min, max }) => {
        state.density.min = min
        state.density.max = max
    },
    SET_PRESETS_OG(state, { rhyMin, rhyMax, spdMin, spdMax, expMin, expMax, modMin, modMax, orgMin, orgMax }) {
        state.rhythm.min = rhyMin
        state.rhythm.max = rhyMax
        state.speed.min = spdMin
        state.speed.max = spdMax
        state.experimental.min = expMin
        state.experimental.max = expMax
        state.mood.min = modMin
        state.mood.max = modMax
        state.organic.min = orgMin
        state.organic.max = orgMax
    },
    CLEAR_PB_FILTERS(state) {
        state.rhythm.min = 0
        state.rhythm.max = 10
        state.speed.min = 0
        state.speed.max = 10
        state.experimental.min = 0
        state.experimental.max = 10
        state.mood.min = 0
        state.mood.max = 10
        state.organic.min = 0
        state.organic.max = 10
    },
    SET_SONG_IDS(state, ids) {
        state.tempSongIDs = ids
    },
    HIDE_PLAYER(state) {
        state.playerBar = false
    },
    SHOW_PLAYER(state) {
        state.playerBar = true
    },
    OPEN_LICENSE_PANEL(state, id) {
        state.licensePanel = true
        state.licenseData.id = id
    },
    CLOSE_LICENSE_PANEL(state) {
        state.licensePanel = false
        state.licenseData.category = ''
        state.licenseData.type = ''
        state.licenseData.subType = ''
        state.licenseSong = []
    },
    UPDATE_LICENSE_CATEGORY(state, type) {
        state.licenseData.category = type
    },
    UPDATE_LICENSE_TYPE(state, type) {
        state.licenseData.type = type
    },
    UPDATE_LICENSE_SUBTYPE(state, type) {
        state.licenseData.subType = type
    },
    UPDATE_LICENSE_ALL(state) {
        state.licenseData.category = ''
        state.licenseData.type = ''
        state.licenseData.subType = ''
    },
    UPDATE_LICENSE_SONG(state, song) {
        state.licenseSong = song
    },

    CART_HAS_ITEM(state) {
        state.itemInCart = true
    },
    CART_HAS_NONE(state) {
        state.itemInCart = false
    },
    ADD_TO_CART(state, data) {
        state.cart.push(data)
    },
    DELETE_FROM_CART(state, index) {
        state.cart.splice(index, 1)
    },
    EMPTY_CART(state) {
        state.cart = []
    },
    SET_CART(state, data) {
        state.cart = data
    },
    SET_LICENSE_DB(state, data) {
        state.licenseDB = data
    },
    OPEN_CART(state) {
        state.cartPanel = true
    },
    CLOSE_CART(state) {
        state.cartPanel = false
    },
    TOGGLE_CART(state) {
        state.cartPanel = !state.cartPanel
    },

    setFilterSong(state, song) { state.filter.song = [song] },
    rmFilterSong(state, song) { 
        let index = state.filter.song.findIndex(a => a.id == song)
        state.filter.song.splice(index, 1)},
    addFilterSong(state, song) { state.filter.song.push(song)},
    clearFilterSong(state) { state.filter.song = [] },

    setFilterAlbum(state, album) { state.filter.album = [album] },
    rmFilterAlbum(state, album) { 
        let index = state.filter.album.findIndex(a => a.id == album)
        state.filter.album.splice(index, 1)},
    addFilterAlbum(state, album) { state.filter.album.push(album)},
    clearFilterAlbum(state) { state.filter.album = [] },
    
    setFilterArtist(state, artist) { state.filter.artist = [artist] },
    rmFilterArtist(state, artist) { 
        let index = state.filter.artist.findIndex(a => a.id == artist)
        state.filter.artist.splice(index, 1)},
    addFilterArtist(state, artist) { state.filter.artist.push(artist)},
    clearFilterArtist(state) { state.filter.artist = [] },
    
    setFilterProject(state, project) { state.filter.project = [project] },
    rmFilterProject(state, project) { 
        let index = state.filter.project.findIndex(a => a.key == project)
        state.filter.project.splice(index, 1)},
    addFilterProject(state, project) { state.filter.project.push(project)},
    clearFilterProject(state) { state.filter.project = [] },

    setFilterInstrument(state, instrument) { state.filter.instrument = [instrument] },
    rmFilterInstrument(state, instrument) { 
        let index = state.filter.instrument.findIndex(a => a.key == instrument)
        state.filter.instrument.splice(index, 1)},
    addFilterInstrument(state, instrument) { state.filter.instrument.push(instrument)},
    clearFilterInstrument(state) { state.filter.instrument = [] },

    setFilterGenre(state, genre) { state.filter.genre = [genre] },
    rmFilterGenre(state, genre) { 
        let index = state.filter.genre.findIndex(a => a.key == genre)
        state.filter.genre.splice(index, 1)},
    addFilterGenre(state, genre) { state.filter.genre.push(genre)},
    clearFilterGenre(state) { state.filter.genre = [] },

    setFilterTag(state, tag) { state.filter.tag = [tag] },
    rmFilterTag(state, tag) { 
        let index = state.filter.tag.findIndex(a => a.key == tag)
        state.filter.tag.splice(index, 1)},
    addFilterTag(state, tag) { state.filter.tag.push(tag)},
    clearFilterTag(state) { state.filter.tag = [] },

    setFilterMood(state, mood) { state.filter.mood = [mood] },
    rmFilterMood(state, mood) { 
        let index = state.filter.mood.findIndex(a => a.key == mood)
        state.filter.mood.splice(index, 1)},
    addFilterMood(state, mood) { state.filter.mood.push(mood)},
    clearFilterMood(state) { state.filter.mood = [] },

    setFilterSearch (state, search) { state.filter.search = [search] },
    rmFilterSearch(state, search) { 
        let index = state.filter.search.findIndex(a => a.key == search)
        state.filter.search.splice(index, 1)},
    addFilterSearch(state, search) { state.filter.search.push(search)},
    clearFilterSearch(state) { state.filter.search = [] },

    setOrder(state, order) { state.filter.order = order },

    clearFilter (state) {
        state.filter.album = []
        state.filter.artist = []
        state.filter.project = []
        state.filter.song = []
        state.filter.instrument = []
        state.filter.genre = []
        state.filter.tag = []
        state.filter.mood = []
        state.filter.search = []
        state.filter.order = 'Rate'
    },
    setAllFilter (state, {album, artist, project, song, instrument, genre, tag, mood, search, order}) {
        state.filter.album = album
        state.filter.artist = artist
        state.filter.project = project
        state.filter.song = song
        state.filter.instrument = instrument
        state.filter.genre = genre
        state.filter.tag = tag
        state.filter.mood = mood
        state.filter.search = search
        state.filter.order = order
    },
}

export const actions = {
    async nuxtServerInit({ commit }) {
        const response = await axios.get(songsUrl);
        const data = response.data;
        commit("SET_SONGS", data);
        const alresponse = await axios.get(albumsUrl);
        const aldata = alresponse.data;
        commit("SET_ALBUMS", aldata);
        const artresponse = await axios.get(artistsUrl);
        const artdata = artresponse.data;
        commit("SET_ARTISTS", artdata);
        const featArtresponse = await axios.get(featArtistsUrl);
        const featArtdata = featArtresponse.data;
        commit("SET_FEATARTISTS", featArtdata);
    },
    async PlayNext({ commit, state, getters }) {
        if(state.sqQueue.length == 0) {
            let newID = await getters.GENERATE_NEXT_SONG(state.sqPlaying[0])
            commit('PLAY_GENERATED', newID.ID)
        } else {
            commit('PLAY_NEXT')
        }
    },
    async OpenLicenseP({ commit, state, getters }, id) {
        const response = await axios.get(licenseUrl);
        const data = response.data;
        commit("SET_LICENSE_DB", data);
        if(state.singleSongPanel) {
            commit('CLOSE_SING_SONG')
        }
        commit('CLOSE_LICENSE_PANEL')
        let song = await getters.GET_SONG(id)
        // const data = song.data;
        setTimeout(() => {
            commit('UPDATE_LICENSE_SONG', song)
            commit('OPEN_LICENSE_PANEL', id)
        }, 500)
    },
    PlayAllIDs({ commit }, ids) {
        let song1 = ids[0]
        commit('PLAY_THIS', song1)
    },
    setRange({ commit, dispatch }, { data, ids }) {
        if(data.type == 'PLAY') {
            let rangeIDs = ids.slice(data.from, data.to)
            dispatch('PlayAllIDs', rangeIDs)
            setTimeout(()=> {
                let thelen = rangeIDs.length
                let theRest = rangeIDs.splice(1, thelen - 1)
                commit('ADD_ALL_AFTER_PLAY', theRest)
            }, 3000)
        } else {
            let rangeIDs = ids.slice(data.from, data.to)
            let leng = Number(data.to - data.from)
            commit('ADD_ALL', rangeIDs)
            setTimeout(() => {
                dispatch('addedQPanel', leng)
            }, 1000)
        }
    },
    playThemAction({ commit, dispatch }, ids ) {
        let rangeIDs = ids
        dispatch('PlayAllIDs', rangeIDs)
        setTimeout(()=> {
            let thelen = rangeIDs.length
            let theRest = rangeIDs.splice(1, thelen - 1)
            commit('ADD_ALL_AFTER_PLAY', theRest)
        }, 3000)
    },
    AddThemAction({ commit, dispatch }, ids ) {
        commit('ADD_ALL', ids)
        let leng = ids.length
        setTimeout(() => {
            dispatch('addedQPanel', leng)
        }, 1000)
    },
    
    /// This actuion is currently used in Single Song Page, but should be merged to 'OpenSingSonP'??
    async OpenSimSong({ commit, state, getters }, id) {
        if(state.queuePanel && state.windowWidth <= 600) {
            commit('CLOSE_QUEUE')
        }
        if(state.singleSongPanel) {
            commit('CLOSE_SING_SONG')
        }
        if(state.similarPanel && id !== state.simOG[0].ID) {
            commit('CLOSE_SIMSON')
            let og = await getters.GET_SONG(id)
            let data = await getters.SIM_SON_PANEL_DATA(id)
            setTimeout(() => {
                commit('SET_SIMOGP', og)
                commit('OPEN_SIMSON', data)
            }, 500)
        } else if(state.similarPanel && id == state.simOG[0].ID) {
        } else {
            let og = await getters.GET_SONG(id)
            let data = await getters.SIM_SON_PANEL_DATA(id)
            commit('SET_SIMOGP', og)
            commit('OPEN_SIMSON', data)
        }
        if(state.sideNavOpen) {
            commit('MENU_CLOSE')
        }
    },
    async OpenSingSonP({ commit }, id) {
        let singleUrl = baseURL + '/singlesong/' + id
        const response = await axios.get(singleUrl);
        const data = response.data;
        commit('SET_SINGSON_P', data)
        commit('OPEN_SING_SONG')
    },
    async PrevSingSonP({ state, commit }, id) {
        let index = await state.songs.findIndex(song => song.ID == id)
        let prevIndex = (index == 0) ? state.songs.length -1 : index -1
        let prevID = await state.songs[prevIndex].ID
        let singleUrl = baseURL + '/singlesong/' + prevID
        const response = await axios.get(singleUrl);
        const data = response.data;
        commit('CLOSE_SING_SONG')
        commit('SET_SINGSON_P', data)
        commit('OPEN_SING_SONG')

        let prevRate = data.Rate
        console.log('||||||||||||||||||||||', '\n', '|| Cuurent Song || ', '\n', 
        'ID: ', id, '/ Index: ', index, '\n',
        '|| Prev Song || ', '\n', 
        'ID: ', prevID, '/ Index: ', prevIndex, '/ Rating: ', prevRate)
    },
    async NextSingSonP({ state, commit }, id) {
        let index = await state.songs.findIndex(song => song.ID == id)
        let nextIndex = (index == (state.songs.length -1)) ? 0 : index +1
        let nextID = await state.songs[nextIndex].ID
        let singleUrl = baseURL + '/singlesong/' + nextID
        const response = await axios.get(singleUrl);
        const data = response.data;
        commit('CLOSE_SING_SONG')
        commit('SET_SINGSON_P', data)
        commit('OPEN_SING_SONG')

        let nextRate = data.Rate
        console.log('||||||||||||||||||||||', '\n', '|| Cuurent Song || ', '\n', 
        'ID: ', id, '/ Index: ', index, '\n',
        '|| Next Song || ', '\n', 
        'ID: ', nextID, '/ Index: ', nextIndex, '/ Rating: ', nextRate)
    },
    CopyURL({ commit }, url) {
        navigator.clipboard.writeText(url);
        commit('FLASH_ON', 'URL COPIED')
        setTimeout(() => {
            commit('FLASH_OFF')
        }, 1000)
    },
    sentPanel({ commit }) {
        commit('FLASH_ON', 'REQUEST SENT')
        setTimeout(() => {
            commit('FLASH_OFF')
        }, 1000)
    },
    cartPanel({ commit }) {
        commit('FLASH_ON', 'ADDED TO CART')
        setTimeout(() => {
            commit('FLASH_OFF')
        }, 1000)
    },
    orderPanel({ commit }) {
        commit('FLASH_ON', 'THANK YOU!')
        setTimeout(() => {
            commit('FLASH_OFF')
        }, 1000)
    },
    flashPanel({ commit }, msg) {
        commit('FLASH_ON', msg)
        setTimeout(() => {
            commit('FLASH_OFF')
        }, 1000)
    },
    addedQPanel({ commit }, num) {
        commit('FLASH_ON', num + ' SONGS ADDED TO QUEUE')
        setTimeout(() => {
            commit('FLASH_OFF')
        }, 1000)
    },
    deleteFromCart({ state, commit }, id) {
        let index = state.cart.findIndex(function(item) {
            return item.songID == id
          });
        commit('DELETE_FROM_CART', index)
    }
}

export const getters = {
    SIM_SONG_DATA: (state) => {
        let G = state.simSongGap
        let OG = state.songs.filter((song) => {
            return song.ID == state.ogSongID[0]
        })
        let minR = ( OG[0].PBRhythm < G ) ? 0 : OG[0].PBRhythm - G
        let maxR = ( OG[0].PBRhythm > (10 - G) ) ? 10 : OG[0].PBRhythm + G
        let minS = ( OG[0].PBSpeed < G ) ? 0 : OG[0].PBSpeed - G
        let maxS = ( OG[0].PBSpeed > (10 - G) ) ? 10 : OG[0].PBSpeed + G
        let minE = ( OG[0].PBExperimental < G ) ? 0 : OG[0].PBExperimental - G
        let maxE = ( OG[0].PBExperimental > (10 - G) ) ? 10 : OG[0].PBExperimental + G
        let minM = ( OG[0].PBMood < G ) ? 0 : OG[0].PBMood - G
        let maxM = ( OG[0].PBMood > (10 - G) ) ? 10 : OG[0].PBMood + G
        let minO = ( OG[0].PBOrganic < G ) ? 0 : OG[0].PBOrganic - G
        let maxO = ( OG[0].PBOrganic > (10 - G) ) ? 10 : OG[0].PBOrganic + G
        return state.songs.filter((song) => {
            return ( song.PBRhythm >= minR && song.PBRhythm <= maxR && song.PBSpeed >= minS && song.PBSpeed <= maxS && song.PBExperimental >= minE && song.PBExperimental <= maxE && song.PBMood >= minM && song.PBMood <= maxM && song.PBOrganic >= minO && song.PBOrganic <= maxO && song.ID !== OG[0].ID )
        })
    },
    SIM_SON_PANEL_DATA: (state) => (id) => {
        let G = state.simSongGap
        let OG = state.songs.filter((song) => {
            return song.ID == id
        })
        let minR = ( OG[0].PBRhythm < G ) ? 0 : OG[0].PBRhythm - G
        let maxR = ( OG[0].PBRhythm > (10 - G) ) ? 10 : OG[0].PBRhythm + G
        let minS = ( OG[0].PBSpeed < G ) ? 0 : OG[0].PBSpeed - G
        let maxS = ( OG[0].PBSpeed > (10 - G) ) ? 10 : OG[0].PBSpeed + G
        let minE = ( OG[0].PBExperimental < G ) ? 0 : OG[0].PBExperimental - G
        let maxE = ( OG[0].PBExperimental > (10 - G) ) ? 10 : OG[0].PBExperimental + G
        let minM = ( OG[0].PBMood < G ) ? 0 : OG[0].PBMood - G
        let maxM = ( OG[0].PBMood > (10 - G) ) ? 10 : OG[0].PBMood + G
        let minO = ( OG[0].PBOrganic < G ) ? 0 : OG[0].PBOrganic - G
        let maxO = ( OG[0].PBOrganic > (10 - G) ) ? 10 : OG[0].PBOrganic + G
        return state.songs.filter((song) => {
            return ( song.PBRhythm >= minR && song.PBRhythm <= maxR && song.PBSpeed >= minS && song.PBSpeed <= maxS && song.PBExperimental >= minE && song.PBExperimental <= maxE && song.PBMood >= minM && song.PBMood <= maxM && song.PBOrganic >= minO && song.PBOrganic <= maxO && song.ID !== OG[0].ID )
        })
    },
    QUEUE_DATA: (state) => {
        if(state.sqQueue.length < 1) {
            return []
        } else {
            let data = []
            for(let q = 0; q < state.sqQueue.length; q++) {
                for(let s = 0; s < state.songs.length; s++) {
                  if( state.songs[s].ID == state.sqQueue[q] ) {
                    data.push(state.songs[s])
                  }
              }
            }
            return data
        }
    },
    PLAYING_DATA: (state) => {
        let filtered
            filtered = state.songs.filter((song) => {
                return song.ID.match(state.sqPlaying[0])
            })
            return filtered[0]
    },
    AUDIO_SRC: (state, getters) => {
        let thedata = getters.PLAYING_DATA
        return 'https://pblibrary.s3.us-east-2.amazonaws.com/' + thedata.CatNum + '/' + thedata.ID  + '.mp3';
    },
    ENDED_DATA: (state) => {
        if(state.sqEnded.length < 1) {
            return []
        } else {
            let data = []
            for(let q = 0; q < state.sqEnded.length; q++) {
                for(let s = 0; s < state.songs.length; s++) {
                  if( state.songs[s].ID == state.sqEnded[q] ) {
                    data.push(state.songs[s])
                  }
              }
            }
            return data
        }
    },
    PLAYLIST_DATA: (state) => {
        if(state.playlist.length < 1) {
            return []
        } else {
            let data = []
            for(let q = 0; q < state.playlist.length; q++) {
                for(let s = 0; s < state.songs.length; s++) {
                  if( state.songs[s].ID == state.playlist[q] ) {
                    data.push(state.songs[s])
                  }
              }
            }
            return data
        }
    },
    SLUG: () => (title) => {
        return title.toLowerCase().replace(/\s+/g, '-')
    },
    COVER_IMG: () => (CatNum, SongID) => {
        if (CatNum == 'PB26') {
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/PB26/' + SongID +'_thumb.jpg'
        } else if (CatNum == 'PB36') {
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/PB36/' + SongID +'_thumb.jpg'
        } else if (CatNum == 'PB37') {
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/PB37/' + SongID +'_thumb.jpg'
        } else {
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/' + CatNum +'/cover-thumb.jpg'
        }
    },
    COVER_IMG_L: () => (CatNum, SongID) => {
        if (CatNum == 'PB26') {
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/PB26/' + SongID +'.jpg'
        } else if (CatNum == 'PB36') {
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/PB36/' + SongID +'.jpg'
        } else if (CatNum == 'PB37') {
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/PB37/' + SongID +'.jpg'
        } else {
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/' + CatNum +'/cover.jpg'
        }
    },
    FEATART_LINK: (state) => (FeatArtist) => {
        if(FeatArtist.includes(',')) {
            let parts = FeatArtist.split(', ');
            let finalStr = ' ft. ';
            for(let a = 0; a < parts.length; a++) {
                let theFA = state.featArtists.filter((artist) => artist.ArtistName == parts[a] )
                let linkStr = '<a href="' + theFA[0].URL + '" target="_blank">' + theFA[0].ArtistName + '</a>'
                if (a == parts.length-1) {
                    finalStr = finalStr + linkStr
                } else {
                    finalStr = finalStr + linkStr + ', '
                }
            }
            return finalStr
        } else {
            let theFA = state.featArtists.filter((artist) => artist.ArtistName == FeatArtist )
            return ' ft. <a href="' + theFA[0].URL + '" target="_blank">' + theFA[0].ArtistName + '</a>'
        }
    },
    GENERATE_NEXT_SONG: (state) => (id) => {
        let len = state.songs.length;
        let randomNum = Math.random() * (len - 1);

        let G = state.simSongGap
        let OG = state.songs.filter((song) => song.ID == id )
        let minR = ( OG[0].PBRhythm < G ) ? 0 : OG[0].PBRhythm - G
        let maxR = ( OG[0].PBRhythm > (10 - G) ) ? 10 : OG[0].PBRhythm + G
        let minS = ( OG[0].PBSpeed < G ) ? 0 : OG[0].PBSpeed - G
        let maxS = ( OG[0].PBSpeed > (10 - G) ) ? 10 : OG[0].PBSpeed + G
        let minE = ( OG[0].PBExperimental < G ) ? 0 : OG[0].PBExperimental - G
        let maxE = ( OG[0].PBExperimental > (10 - G) ) ? 10 : OG[0].PBExperimental + G
        let minM = ( OG[0].PBMood < G ) ? 0 : OG[0].PBMood - G
        let maxM = ( OG[0].PBMood > (10 - G) ) ? 10 : OG[0].PBMood + G
        let minO = ( OG[0].PBOrganic < G ) ? 0 : OG[0].PBOrganic - G
        let maxO = ( OG[0].PBOrganic > (10 - G) ) ? 10 : OG[0].PBOrganic + G
        let nextsongs = state.songs.filter((song) => {
            return ( song.PBRhythm >= minR && song.PBRhythm <= maxR && song.PBSpeed >= minS && song.PBSpeed <= maxS && song.PBExperimental >= minE && song.PBExperimental <= maxE && song.PBMood >= minM && song.PBMood <= maxM && song.PBOrganic >= minO && song.PBOrganic <= maxO && song.ID !== OG.ID )
        })
        let filtered = nextsongs.filter(item => !state.sqPlaying.includes(item.ID))
        let moreFltd = filtered.filter(item => !state.sqEnded.includes(item.ID))
        
        if(moreFltd.length == 0) {
            return state.songs[randomNum]
        } else {
            return moreFltd[0] 
        }       
    },
    GET_SONG: (state) => (id) => {
        return state.songs.filter((song) => {
            return song.ID == id
        })
    },
    PB_FILTERED_SONGS: (state) => {
        return state.songs.filter((song) => {
            return (song.PBRhythm >= state.rhythm.min) && (song.PBRhythm <= state.rhythm.max) && (song.PBSpeed >= state.speed.min) && (song.PBSpeed <= state.speed.max) && (song.PBExperimental >= state.experimental.min) && (song.PBExperimental <= state.experimental.max) && (song.PBMood >= state.mood.min) && (song.PBMood <= state.mood.max) && (song.PBOrganic >= state.organic.min) && (song.PBOrganic <= state.organic.max) 
        })
    },
    FILTERED_SONGS_SEARCH: (state, getters) => {
        let filteredList = getters.PB_FILTERED_SONGS

        // Filter song
            if(state.filter.song.length !== 0) {
                const songList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.song.forEach(a => {
                    if (filteredList[i].ID !== null && filteredList[i].ID.match(a.id)) {
                      if((songList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        songList.push(filteredList[i])
                    }}})}
                filteredList = songList }

        // Filter search
            if (state.filter.search.length !== 0 && filteredList.length > 0) {
            const searchList = []
            for (let i = 0; i < filteredList.length; i++) {
                state.filter.search.forEach(a => {
                if ((filteredList[i].Title && filteredList[i].Title.toLowerCase().includes(a.key.toLowerCase())) || (filteredList[i].Description && filteredList[i].Description.toLowerCase().includes(a.key.toLowerCase())) || (filteredList[i].Story && filteredList[i].Story.toLowerCase().includes(a.key.toLowerCase()))) {
                if((searchList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                    searchList.push(filteredList[i])
                }}})}
            filteredList = searchList } 

        // Filter album
            if (state.filter.album.length !== 0 && filteredList.length > 0) {
                const albumList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.album.forEach(a => {
                    if (filteredList[i].CatNum !== null && filteredList[i].CatNum.match(a.id)) {
                    if((albumList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        albumList.push(filteredList[i])
                    }}})}
                filteredList = albumList}
  
        // Filter project
            if (state.filter.project.length !== 0 && filteredList.length > 0) {
                const projectList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.project.forEach(a => {
                    if (filteredList[i].ArtistName !== null && filteredList[i].ArtistName.match(a.key)) {
                    if((projectList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        projectList.push(filteredList[i])
                    }}})}
                filteredList = projectList}
  
        // Filter artist (writer)
            if (state.filter.artist.length !== 0 && filteredList.length > 0) {
        
                ////!!!! This is AND search method !!!!////
                // const filtered = filteredList.filter(song => { 
                //   return filter.artist.every(a => {
                //     return song.WriterSlug.includes(a)
                //   })})
                // filteredList = filtered
                
                //// This is OR search method ////
                const searchList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.artist.forEach(a => {
                    if (filteredList[i].WriterSlug !== null && filteredList[i].WriterSlug.includes(a.id)) {
                        if((searchList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        searchList.push(filteredList[i])
                        }}})}
                filteredList = searchList }
  
        // Filter song
            if (state.filter.song.length !== 0 && filteredList.length > 0) {
                const songList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.song.forEach(a => {
                    if (filteredList[i].ID !== null && filteredList[i].ID.match(a.id)) {
                    if((songList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        songList.push(filteredList[i])
                    }}})}
                filteredList = songList }
  
        // Filter instrument
            if (state.filter.instrument.length !== 0 && filteredList.length > 0) {
                const instrumentList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.instrument.forEach( a => {
                    if (filteredList[i].Instruments && filteredList[i].Instruments.toLowerCase().includes( a.key.toLowerCase() )) {
                    if((instrumentList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        instrumentList.push(filteredList[i])
                    }}})}
                filteredList = instrumentList }
  
        // Filter genre, tag, mood
            if (state.filter.genre.length !== 0 && filteredList.length > 0 || state.filter.tag.length !== 0 && filteredList.length > 0 || state.filter.mood.length !== 0 && filteredList.length > 0) {
            const genreList = []
            let keyList = state.filter.genre.concat(state.filter.tag)
            keyList = keyList.concat(state.filter.mood)
            for (let i = 0; i < filteredList.length; i++) {
                keyList.forEach(a => {
                if (filteredList[i].Tags && filteredList[i].Tags.toLowerCase().includes(a.key.toLowerCase()) || (filteredList[i].Genre && filteredList[i].Genre.toLowerCase().includes(a.key.toLowerCase())) || (filteredList[i].SubGenreA && filteredList[i].SubGenreA.toLowerCase().includes(a.key.toLowerCase())) || (filteredList[i].SubGenreB && filteredList[i].SubGenreB.toLowerCase().includes(a.key.toLowerCase())) || (filteredList[i].PrimaryMood && filteredList[i].PrimaryMood.toLowerCase().includes(a.key.toLowerCase())) || (filteredList[i].SecondaryMoods && filteredList[i].SecondaryMoods.toLowerCase().includes(a.key.toLowerCase()))) {
                    if((genreList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                    genreList.push(filteredList[i])
                    }}})
            }
            filteredList = genreList
            }

        // Order
            if (state.filter.order === 'Rate') {
                filteredList.sort(({Rate:a}, {Rate:b}) => b-a);
                } else if (state.filter.order === 'Seq') {
                    filteredList.sort(({Seq:a}, {Seq:b}) => a-b);
            }
      return filteredList
    },
    FILTERED_SONGS_IDS: (state, getters) => {
        let searchedList = getters.FILTERED_SONGS_SEARCH
        let ids = []
            for (let s = 0; s < searchedList.length; s++ ) {
                ids.push(searchedList[s].ID)
            }
        return ids
    },
    SONGS_SEARCH: (state) => {
        let filteredList = [...state.songs]

        // Filter song
            if(state.filter.song.length !== 0) {
                const songList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.song.forEach(a => {
                    if (filteredList[i].ID !== null && filteredList[i].ID.match(a.id)) {
                      if((songList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        songList.push(filteredList[i])
                    }}})}
                filteredList = songList }
                
        // Filter search
            if (state.filter.search.length !== 0 && filteredList.length > 0) {
            const searchList = []
            for (let i = 0; i < filteredList.length; i++) {
                state.filter.search.forEach(a => {
                if ((filteredList[i].Title && filteredList[i].Title.toLowerCase().includes(a.key.toLowerCase())) || (filteredList[i].Description && filteredList[i].Description.toLowerCase().includes(a.key.toLowerCase())) || (filteredList[i].Story && filteredList[i].Story.toLowerCase().includes(a.key.toLowerCase()))) {
                if((searchList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                    searchList.push(filteredList[i])
                }}})}
            filteredList = searchList } 
  
        // Filter album
            if (state.filter.album.length !== 0 && filteredList.length > 0) {
                const albumList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.album.forEach(a => {
                    if (filteredList[i].CatNum !== null && filteredList[i].CatNum.match(a.id)) {
                    if((albumList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        albumList.push(filteredList[i])
                    }}})}
                filteredList = albumList}
  
        // Filter project
            if (state.filter.project.length !== 0 && filteredList.length > 0) {
                const projectList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.project.forEach(a => {
                    if (filteredList[i].ArtistName !== null && filteredList[i].ArtistName.match(a.key)) {
                    if((projectList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        projectList.push(filteredList[i])
                    }}})}
                filteredList = projectList}
  
        // Filter artist (writer)
            if (state.filter.artist.length !== 0 && filteredList.length > 0) {
        
                ////!!!! This is AND search method !!!!////
                // const filtered = filteredList.filter(song => { 
                //   return filter.artist.every(a => {
                //     return song.WriterSlug.includes(a)
                //   })})
                // filteredList = filtered
                
                //// This is OR search method ////
                const searchList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.artist.forEach(a => {
                    if (filteredList[i].WriterSlug !== null && filteredList[i].WriterSlug.includes(a.id)) {
                        if((searchList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        searchList.push(filteredList[i])
                        }}})}
                filteredList = searchList }
  
        // Filter song
            if (state.filter.song.length !== 0 && filteredList.length > 0) {
                const songList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.song.forEach(a => {
                    if (filteredList[i].ID !== null && filteredList[i].ID.match(a.id)) {
                    if((songList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        songList.push(filteredList[i])
                    }}})}
                filteredList = songList }
  
        // Filter instrument
            if (state.filter.instrument.length !== 0 && filteredList.length > 0) {
                const instrumentList = []
                for (let i = 0; i < filteredList.length; i++) {
                    state.filter.instrument.forEach( a => {
                    if (filteredList[i].Instruments && filteredList[i].Instruments.toLowerCase().includes( a.key.toLowerCase() )) {
                    if((instrumentList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                        instrumentList.push(filteredList[i])
                    }}})}
                filteredList = instrumentList }
  
        // Filter genre, tag, mood
            if (state.filter.genre.length !== 0 && filteredList.length > 0 || state.filter.tag.length !== 0 && filteredList.length > 0 || state.filter.mood.length !== 0 && filteredList.length > 0) {
            const genreList = []
            let keyList = state.filter.genre.concat(state.filter.tag)
            keyList = keyList.concat(state.filter.mood)
            for (let i = 0; i < filteredList.length; i++) {
                keyList.forEach(a => {
                if (filteredList[i].Tags && filteredList[i].Tags.toLowerCase().includes(a.key.toLowerCase()) || (filteredList[i].Genre && filteredList[i].Genre.toLowerCase().match(a.key.toLowerCase())) || (filteredList[i].SubGenreA && filteredList[i].SubGenreA.toLowerCase().match(a.key.toLowerCase())) || (filteredList[i].SubGenreB && filteredList[i].SubGenreB.toLowerCase().match(a.key.toLowerCase())) || (filteredList[i].PrimaryMood && filteredList[i].PrimaryMood.toLowerCase().match(a.key.toLowerCase())) || (filteredList[i].SecondaryMoods && filteredList[i].SecondaryMoods.toLowerCase().match(a.key.toLowerCase()))) {
                    if((genreList.findIndex(s => s.ID == filteredList[i].ID)) === -1) {
                    genreList.push(filteredList[i])
                    }}})
            }
            filteredList = genreList
            }

        // Order
            if (state.filter.order === 'Rate') {
                filteredList.sort(({Rate:a}, {Rate:b}) => b-a);
                } else if (state.filter.order === 'Seq') {
                    filteredList.sort(({Seq:a}, {Seq:b}) => a-b);
            }
      return filteredList
    }
}