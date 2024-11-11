import React from 'react'
// import { Link } from 'react-router-dom'
import Loader from './Loader'


const NewsFeedSingle = (props) => {
  // console.log(props.data)
  const data = props.data
  const news = data.slice(0, 5)
  console.log(news)


  if (!props.data) return <Loader />

  return (
    <div className="news-feed">
      {news.map((ele, i) => {
        return (
          <div class="card" key={i}>
            <div class="card-content">
              <p class="title">{ele.title} </p>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <span>
                  {ele.published_at}
                </span>
              </p>
            </footer>
          </div>
        )
      })}

    </div>
  )

}

export default NewsFeedSingle