import BookmarkedNewsStateType from "../../types/BookmarkedNewsStateType";
import { BookmarkActionsType } from "../actions/bookmarkNewsActions";
import { ADD_TO_BOOKMARK, REMOVE_FROM_BOOKMARK } from "../actionTypes/bookmarkNewsTypes";


const initialState: BookmarkedNewsStateType = {
    bookmarkedNews: []
}

const bookmarkNewsReducer = (state: BookmarkedNewsStateType = initialState, action: BookmarkActionsType) : BookmarkedNewsStateType => {
    switch (action.type) {
        case ADD_TO_BOOKMARK: {
            console.log("Bookmarked", state.bookmarkedNews)

            return {
            ...state,
            bookmarkedNews: [...state.bookmarkedNews, action.news]
        }
    }
        case REMOVE_FROM_BOOKMARK: {
            console.log("Bookmarked", state.bookmarkedNews)
            console.log("remove", action.news)
                return {
                ...state,
                bookmarkedNews: state.bookmarkedNews.filter( news => news.title !== action.news.title)
            }
        }
        default: return state
    }
}

export default bookmarkNewsReducer