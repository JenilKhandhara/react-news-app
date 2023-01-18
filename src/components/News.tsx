import NewsType from '../types/NewsType';

type Props = {
    news: NewsType
}
function News(props: Props) {
  return (
    <div>
      <h1>{props.news.title}</h1>
      <img src={props.news.urlToImage} height={500} width={500} ></img>
      <p>{props.news.description}</p>
    </div>
  )
}

export default News