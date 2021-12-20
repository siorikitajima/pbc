const axios = require('axios');
import baseURL from '~/assets/api-url.js'

let songsUrl = baseURL + `/songs`
let albumsUrl = baseURL + '/albums'
let artistsUrl = baseURL + '/artists'
let licenseUrl = baseURL + '/license'

export const state = () => ({
    songs: [],
    albums: [],
    artists: [],
    ogSongID: '',
    tempSongIDs: [],
    // rangeSlider: false,

    similarPanel: false,
    simSongGap: 1.5,
    simOG: [],
    simSonData: [],

    queuePanel: false,
    sqQueue: [],
    sqPlaying: [],
    sqEnded: [],
    alsoPlay: 0,
    playerBar: true,

    singleSongPanel: false,
    singSonData: [],

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
    SET_SONGS: (state, payload) => {
        state.songs = payload;
    },
    SET_ALBUMS: (state, payload) => {
        state.albums = payload;
    },
    SET_ARTISTS: (state, payload) => {
        state.artists = payload;
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
    TOGGLE_QUEUE: (state) => {
        state.queuePanel = !state.queuePanel
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
    SET_SEARCH: (state, value) => {
        state.search = value
    },
    SET_ALL_SEARCH: (state, value) => {
        state.allSearch = value
    },
    ADD_ALL_SEARCH: (state, value) => {
        state.allSearch.push(value)
    },
    SPLICE_ALL_SEARCH: (state, { id, num }) => {
        state.allSearch.splice( id, num )
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
    SET_SONG_IDS(state, ids) {
        state.tempSongIDs = ids
    },
    // OPEN_RANGE_SLIDER(state) {
    //     state.rangeSlider = true
    // },
    // CLOSE_RANGE_SLIDER(state) {
    //     state.rangeSlider = false
    // },
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
    // UPDATE_LICENSE_ID(state, id) {
    //     state.licenseData.id = id
    // },
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
    }
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
    
    /// This actuion is currently used in Single Song Page, but should be merged to 'OpenSingSonP'
    async OpenSimSong({ commit, state, getters }, id) {
        if(state.singleSongPanel) {
            commit('CLOSE_SING_SONG')
        }
        if(state.similarPanel) {
            commit('CLOSE_SIMSON')
            let og = await getters.GET_SONG(id)
            let data = await getters.SIM_SON_PANEL_DATA(id)
            setTimeout(() => {
                commit('SET_SIMOGP', og)
                commit('OPEN_SIMSON', data)
            }, 500)
        } else {
            let og = await getters.GET_SONG(id)
            let data = await getters.SIM_SON_PANEL_DATA(id)
            commit('SET_SIMOGP', og)
            commit('OPEN_SIMSON', data)
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
    // setPresets({ commit }, { rhy, spd, exp, mod, org }) {
    //     commit('SET_PRESET_RHY', rhy)
    //     commit('SET_PRESET_SPD', spd)
    //     commit('SET_PRESET_EXP', exp)
    //     commit('SET_PRESET_MOD', mod)
    //     commit('SET_PRESET_ORG', org)
    // }
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
        if(state.sqPlaying.length < 1) {
            return state.songs[0]
        } else {
            let filtered = state.songs.filter((song) => {
                return song.ID.match(state.sqPlaying[0])
            })
            return filtered[0]
        }
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
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/PB26/' + SongID +'.jpg'
        } else if (CatNum == 'PB36') {
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/PB36/' + SongID +'.jpg'
        } else if (CatNum == 'PB37') {
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/PB37/' + SongID +'.jpg'
        } else {
            return 'https://pblibrary.s3.us-east-2.amazonaws.com/' + CatNum +'/cover-thumb.jpg'
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
    }
}