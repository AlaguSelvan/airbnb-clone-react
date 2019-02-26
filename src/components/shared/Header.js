import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import RentalSearchInput from 'components/rental/RentalSearchInput'

class Header extends React.Component{
  
  handleLogout = () => {
    this.props.logout()
    this.props.history.push('/rentals')
  }

  renderAuthButtons = () => {
    const {isAuth} = this.props.auth
    // const {logout} = this.props
    if(isAuth){
      return <a className='nav-item nav-link clickable' onClick={this.handleLogout}>logout</a>
    }
      return (
        <>
                <Link className='nav-item nav-link active' to='/login'>Login <span className='sr-only'>(current)</span></Link>
        <Link className='nav-item nav-link' to='/register'>Register</Link>
        </>
      )
  }

  render(){
    const {logout} = this.props
return (
<nav className='navbar navbar-dark navbar-expand-lg'>
  <div className='container'>
    <Link className='navbar-brand' to='/rentals'>BookWithMe</Link>
      <RentalSearchInput />
    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
      <span className='navbar-toggler-icon'></span>
    </button>
    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
      <div className='navbar-nav ml-auto'>
        {this.renderAuthButtons()}
      </div>
    </div>
  </div>
</nav>
    )
  }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(Header))
