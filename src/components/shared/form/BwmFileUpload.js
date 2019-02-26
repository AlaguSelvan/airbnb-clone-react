import React, { Component } from 'react'

class BwmFileUpload extends Component {
  
    onChange = e => {
      const { input: {onChange}} = this.props
        onChange('https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg')
    }
    render() {
      const { label, meta: {touched, error}} = this.props
    return (
      <>
        <label>{label}</label>
        <div className="input-group">
        <input 
        type='file' 
        accept='.jpeg, .png, .jpeg'
        onChange={this.onChange}
        />
        </div>
        {touched &&
            ((error && <div className="alert alert-danger">{error}</div>))}
      </>
    )
  }
}

export default BwmFileUpload