import React, { Component } from 'react'
import NewsType from '../types/NewsType';

type Props = {
    news: NewsType
}
export class News extends Component<Props> {
  render() {
    return (
      <div>
        <h1>{this.props.news.title}</h1>
        <img src={this.props.news.urlToImage} height={500} width={500} ></img>
        <p>{this.props.news.description}</p>
      </div>
    )
  }
}

export default News