import NewsType from "../../types/NewsType"
import { ADD_TO_BOOKMARK, REMOVE_FROM_BOOKMARK } from "../actionTypes/bookmarkNewsTypes"

export const addToBookmark = (news: NewsType) => {
    return {
        type: ADD_TO_BOOKMARK,
        news: news
    }
}

export const removeFromBookmark = (news: NewsType) => {
    return {
        type: REMOVE_FROM_BOOKMARK,
        news: news
    }
}

export type BookmarkActionsType = ReturnType<typeof addToBookmark | typeof removeFromBookmark>