import React, { Component } from 'react'
import NewsType from '../types/NewsType'
import News from './News'
import { getNewsHeadlines } from '../data/NewsApi'

interface NewsListState {
  newsList: Array<NewsType>,
  page: number
}

interface NewsListProps {
  searchNews: string
}

const PAGESIZE = 10

export class NewsList extends Component<NewsListProps, NewsListState> {
  
  constructor(props: NewsListProps) {
    super(props)
    this.state = {
      newsList: [],
      page: 1
    }
  }

  handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
        && 
        this.props.searchNews === ""
      ) {
        this.setState(prevState => {
          return {
            page: prevState.page + 1
          }
        }, this.updateNewsList)
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  updateNewsList = async () => {
    getNewsHeadlines(this.state.page, PAGESIZE)
      .then( response => {
        if (response.data.status === "ok" ) {
          const fetchedNews: Array<NewsType> = this.state.newsList
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
          this.setState({
            newsList: fetchedNews
          })
          console.log(fetchedNews)
        }
      })
      .catch((error) => {
        console.log(error)
    })
  }

  updateSearchResult() {
    if (this.props.searchNews === "") {
      this.updateNewsList()
      return
    }
    getNewsHeadlines(null, null, this.props.searchNews)
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
          this.setState({
            newsList: fetchedNews
          })
          console.log(fetchedNews)
        }
      })
      .catch((error) => {
        console.log(error)
    })
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handelInfiniteScroll);
    this.updateNewsList()
  }
  
  componentDidUpdate(prevProps: Readonly<NewsListProps>, prevState: Readonly<NewsListState>, snapshot?: any): void {
    if(prevProps.searchNews !== this.props.searchNews) {
      this.updateSearchResult()
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handelInfiniteScroll)
  }

  render() {
    return (
      <div>
        <ul style={{
            listStyle: 'none'
        }}>
            {this.state.newsList.map( news => 
              <div key={news.url} >
                <li  
                onClick={() => {
                  window.location.href = news.url
                  }}
                >
                    <News news={news}/>
                </li>
                <hr />
              </div>
            )}
        </ul>
      </div>
    )
  }
}

export default NewsList