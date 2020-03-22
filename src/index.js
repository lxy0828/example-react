import React from 'react';
import TG from './assets/test.png'
import './index.less';
// import styles from './index.css'
// console.log(styles,9999999)
// import styles from './index.stylus';
class ReactDemo extends React.Component{
  render () {
    return <div>
      <div className='wrapper'>hello world1</div>
      <img src={TG}/>
    </div>
  }
}
export default ReactDemo;
