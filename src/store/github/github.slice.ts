import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const FAVOURITES = 'favourite github repos'

interface GithubState {
    favourites: string[]
}

const initialState: GithubState = {
    favourites: JSON.parse(localStorage.getItem(FAVOURITES) ?? '[]')
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload)
            localStorage.setItem(FAVOURITES, JSON.stringify(state.favourites))
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.favourites = state.favourites.filter(fav => fav !== action.payload)
            localStorage.setItem(FAVOURITES, JSON.stringify(state.favourites))
        }
    }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer