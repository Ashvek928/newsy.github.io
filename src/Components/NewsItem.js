import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageurl,newsurl} = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <img src={!imageurl?"https://www.nj.com/resizer/_lF7k_-uojSWnL-Z9rc5MiZn_kw=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/JH7QHAITQJHBXFO7FENE4TR42E.jpg":imageurl} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <a href={newsurl} className="btn btn-sm btn-dark" target='_blank_'>Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
