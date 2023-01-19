import BookmarkedNewsStateType from '../types/BookmarkedNewsStateType';
import { connect, ConnectedProps } from 'react-redux'
import NewsType from '../types/NewsType';
import News from './News';
import { removeFromBookmark } from '../redux/actions/bookmarkNewsActions';

type PropsType = {
  bookmarkedNews: Array<NewsType>
} & ConnectedProps<typeof connector>

const mapStateToProps = (state: BookmarkedNewsStateType) => {
  return {
    bookmarkedNews: state.bookmarkedNews
  }
}

const mapDispatchToProps = {
  removeFromBookmarkedNews: removeFromBookmark
}

const connector = connect(mapStateToProps, mapDispatchToProps)

function BookmarkedNews({ bookmarkedNews, removeFromBookmarkedNews }: PropsType) {
  return (
  <>
    <div>BookmarkedNews</div>
    <ul style={{
          listStyle: 'none'
        }}>
        {bookmarkedNews.map( news => 
          <div key={news.url} >
            <hr />
            <button onClick={() => removeFromBookmarkedNews(news)}>Unbookmark</button>
            <li  
            onClick={() => {
              window.location.href = news.url
              }}
            >
              <News news={news}/>
            </li>
          </div>
        )}
    </ul>
  </>
 )
}

export default connector(BookmarkedNews)