import React, { useEffect, useState } from 'react'
import NewsType from '../types/NewsType'
import News from './News'
import { getNewsHeadlines } from '../data/NewsApi'
import { addToBookmark, removeFromBookmark } from '../redux/actions/bookmarkNewsActions'
import { connect, ConnectedProps } from 'react-redux'
import BookmarkedNewsStateType from '../types/BookmarkedNewsStateType';


const mapDispatchToProps = {
  addToBookmarkedNews: addToBookmark,
  removeFromBookmarkedNews: removeFromBookmark
}

const mapStateToProps = (state: BookmarkedNewsStateType) => {
  return {
    bookmarkedNews: state.bookmarkedNews
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type NewsListProps = {
  searchNews: string
} & ConnectedProps<typeof connector>;

const PAGESIZE = 10

function NewsList({ searchNews, addToBookmarkedNews, removeFromBookmarkedNews, bookmarkedNews }: NewsListProps) {
  const [newsList, setNewsList] = useState<Array<NewsType>>([])
  const [page, setPage] = useState<number>(1)
  const [newsComponents, setNewsComponents] = useState<Array<React.ReactNode>>([])

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
        && 
        searchNews === ""
      ) {
        setPage((prevPage) => prevPage + 1 )
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateSearchResult = async () => {
    if (searchNews === "") {
      updateNewsList()
      return
    }
    getNewsHeadlines(null, null, searchNews)
      .then( response => {
        if (response.data.status === "ok" ) {
          const fetchedNews: Array<NewsType> = []
          // @ts-ignore: Implicit any error
          response.data.articles.forEach(article => {
            if( fetchedNews.filter(news => news.title === article.title).length === 0) {
              fetchedNews.push({
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                author: article.author
              })
            }
          })
          console.log("here")
          setNewsList(fetchedNews)
          console.log(fetchedNews)
        }
      })
      .catch((error) => {
        console.log(error)
    })
  }

  const updateNewsList = async () => {
    getNewsHeadlines(page, PAGESIZE)
      .then( response => {
        if (response.data.status === "ok" ) {
          const fetchedNews: Array<NewsType> = []
          // @ts-ignore: Implicit any error
          response.data.articles.forEach(article => {
             if( newsList.filter(news => news.title === article.title).length === 0) {
              fetchedNews.push({
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                author: article.author
              })
            }
          })
          setNewsList([...newsList, ...fetchedNews])
          console.log(fetchedNews)
        }
      })
      .catch((error) => {
        console.log(error)
    })
  }

  useEffect(() => {
    updateNewsList()
  }, [page])

  useEffect(() => {
    updateSearchResult()
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handelInfiniteScroll)
    }
  }, [searchNews])

  const isNewsBookmarked = (news: NewsType) => bookmarkedNews.filter( bookmarkedNews => bookmarkedNews.title === news.title).length > 0
  
  useEffect(() => {
    setNewsComponents(newsList.map( news =>
      <div key={news.url} >
        <button onClick={() => isNewsBookmarked(news) ? removeFromBookmarkedNews(news) : addToBookmarkedNews(news)}>
          { isNewsBookmarked(news) ? "Unbookmark" : "Bookmark"}
        </button>
        <li
        onClick={() => {
          window.location.href = news.url
          }}
        >
          <News news={news}/>
        </li>
        <hr />
      </div>
    ))
  }, [bookmarkedNews, newsList])

  return (
    <div>
      {newsList.length === 0 ? <p>no news</p> :
        <ul style={{
          listStyle: 'none'
        }}>
          {newsComponents}
        </ul>
      }
    </div>
  )
}

export default connector(NewsList)