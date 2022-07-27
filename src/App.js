import './index.css'
import avatar from './images/avatar.png'
import React from 'react'
// import { tab } from '@testing-library/user-event/dist/tab'
import { v4 as uuid } from 'uuid'

function formatDate (time) {
  return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.toTimeString().slice(0, 8)}`
}

class App extends React.Component {
  state = {
    tabs: [
      {
        id: 1,
        name: 'Time',
        type: 'time'
      },
      {
        id: 2,
        name: 'Popularity',
        type: 'hot'
      }
    ],
    active: 'time',
    list: [
      {
        id: 1,
        author: 'John',
        comment: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        time: new Date('2022-07-20 09:09:00'),
        // 1: like 0：ntg -1: dislike
        attitude: 1
      },
      {
        id: 2,
        author: 'Jane',
        comment: 'There are many variations of passages of Lorem Ipsum available',
        time: new Date('2022-04-11 09:09:00'),
        // 1: like 0：ntg -1: dislike
        attitude: 0
      },
      {
        id: 3,
        author: 'Alex',
        comment: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        time: new Date('2021-10-11 10:09:00'),
        // 1: like 0：ntg -1: dislike
        attitude: -1
      }
    ],
    comment: '',
  }

  switchTab = (type) => {
    console.log('switchTab')
    this.setState({
      active: type,
      list: (type === 'hot') ? this.state.list.sort((a, b) => b.attitude - a.attitude) : this.state.list.sort((a, b) => b.time - a.time)
    })
  }


  handleChange = (e) => {
    this.setState({ comment: e.target.value })
  }

  post = (e) => {
    console.log('post')
    this.setState({
      list: [{
        // id: this.state.list.length + 1,
        id: uuid(),
        author: 'Anonymous',
        comment: this.state.comment,
        time: new Date(),
        attitude: 0
      }, ...this.state.list],
      comment: ''
    })
  }

  deletePost = (id) => {
    console.log('deletePost')
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
  }

  toggleAttitudeLike = (item) => {
    console.log('toggleAttitudeLike')
    const { id, attitude } = item
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            attitude: attitude === 1 ? 0 : 1,
          }
        }
        else {
          return item
        }
      })
    })
  }
  toggleAttitudeHate = (item) => {
    console.log('toggleAttitudeHate')
    const { id, attitude } = item
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          item.attitude = attitude === -1 ? 0 : -1
        }
        return item
      })
    })
  }

  render () {
    return (
      <>
      <div className="App">
        <div className="comment-container">
          {/* no.of comments */}
          <div className="comment-head">
            <span>{this.state.list.length} Comments</span>
          </div>
          {/* sort */}
          <div className="tabs-order">
            <ul className="sort-container">
              {
                this.state.tabs.map(tab => (
                  <li
                    key={tab.id}
                    onClick={() => this.switchTab(tab.type)}
                    className={tab.type === this.state.active ? 'on' : ''}
                  >Sort by {tab.name}</li>
                ))
              }
            </ul>
          </div>

          {/* add comment */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                placeholder="Add a comment"
                value={this.state.comment}
                onChange={this.handleChange}
                className="ipt-txt"
              />
              <button onClick={this.state.comment !== '' ? this.post : null} className="comment-submit">Post</button>
            </div>
            {/* <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">Emoji</span>
            </div> */}
          </div>

          {/* list of comments */}
          <div className="comment-list">
            {
              this.state.list.map(item => (
                <div className="list-item" key={item.id}>
                  <div className="user-face">
                    <img className="user-head-comment" src={avatar} alt="" />
                  </div>
                  <div className="comment">
                    <div className="user">{item.author}</div>
                    <p className="text">{item.comment}</p>
                    <div className="info">
                      <span className="time">{formatDate(item.time)}</span>
                      <span onClick={() => this.toggleAttitudeLike(item)} className={item.attitude === 1 ? 'like liked' : 'like'}>
                        <i className="icon" />
                      </span>
                      <span onClick={() => this.toggleAttitudeHate(item)} className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                        <i className="icon" />
                      </span>
                      <span className="reply btn-hover" onClick={() => this.deletePost(item.id)}>Delete</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <footer className='footer'>
        <div className="footer-container">
          <div>Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0</div>
          <div>Learn from <a href="https://gitee.com/react-course-series/react-jsx-demo">react-jsx-demo</a> </div>
        </div>
      </footer>
      </>)
  }
}


export default App
