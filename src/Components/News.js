import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:6,
    category:'general'
  }  
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  

    constructor(){
        super();
        this.state={
            articles:[],
            loading:true,
            page:1
        }
    }
    async componentDidMount(){   
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=958dcb3034a744e58c30dc0d8c47c615&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles:parsedData.articles,
          totalResults:parsedData.totalResults,
        loading:false})
      }


      handlePrevClick=async()=>{
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=958dcb3034a744e58c30dc0d8c47c615&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
          this.setState({loading:true})
          let data = await fetch(url);
          let parsedData = await data.json()
          this.setState({
              page:this.state.page-1,
              articles:parsedData.articles,
              loading:false
            })
            
        }
        handleNextClick=async()=>{
            if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=958dcb3034a744e58c30dc0d8c47c615&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page:this.state.page+1,
                articles:parsedData.articles,
                loading:false
        })}}

  render() {
    return (
      <div className='container my-3'>
        <h2 className="text-center">Newsy - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
         {!this.state.loading && this.state.articles.map((element)=>{
           return <div className="col-md-4" key={element.url}>
        <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):"" } newsurl={element.url} imageurl={element.urlToImage}/>
        </div>})}
        </div>
        <div className="d-flex justify-content-between container">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" id='btn2' className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
        </div>
    )
  }
}
export default News
