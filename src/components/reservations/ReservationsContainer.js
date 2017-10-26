import React from 'react'
import { connect } from 'react-redux'
import ReservationsList from './ReservationsList'
import { fetchReservations } from '../../actions/reservations'
import { bindActionCreators } from 'redux'
import { updateReservation } from '../../actions/reservations'

class ReservationsContainer extends React.Component {

  onClick = (event) => {
    event.preventDefault()
    let updateParams = {
      id: event.target.value,
      status: event.target.name
    }
    this.props.updateReservation(updateParams)
  }

  componentDidMount(){
    const jwt = localStorage.getItem('jwt')
    this.props.fetchReservations(jwt)
  }


  render(){
    let reservationsPending = []
    let reservationsApproved = []
    let reservationsDenied = []
    if (this.props.reservations !== null) {
      reservationsPending = <ReservationsList reservations={this.props.reservations.filter(res => res.status === "pending")} onclick={this.onClick}/>
      reservationsApproved = <ReservationsList reservations={this.props.reservations.filter(res => res.status === "approved")}/>
      reservationsDenied = <ReservationsList reservations={this.props.reservations.filter(res => res.status === "denied")}/>
  }
    return (
      <div className="ui container">
        <h1>Reservation Requests</h1>
        <div className="ui segment">
          <h2>Pending Requests</h2>
          {reservationsPending}
        </div>
        <div className="ui segment">
          <h2>Approved</h2>
          {reservationsApproved}
        </div>
        <div className="ui segment">
          <h2>Denied</h2>
          {reservationsDenied}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state);
  return{
    reservations: state.reservations.reservations
  }
}

function mapDispatchToProps(dispatch) {
  return  bindActionCreators({fetchReservations, updateReservation}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsContainer)
