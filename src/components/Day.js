import React from 'react'

class Day extends React.Component {
  render() {
    const { details } = this.props;
    return (
      <div className="three columns day">
        <h2 className="day-headline">{ details.date.weekday }</h2>
        <img className="day-icon" src={ details.icon_url } alt={ details.icon }/>
      </div>
    )
  }
}

export default Day;