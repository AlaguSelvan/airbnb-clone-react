import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker'
import {getRangeOfDates} from 'helpers'
import { toast, ToastContainer} from 'react-toastify';
import * as moment from 'moment'
import {BookingModel} from './BookingModel'
import * as actions from 'actions'

export class Booking extends React.Component {
    constructor(){
        super()
        this.bookedOutDates = []
        this.dateRef = React.createRef();
        this.state = {
            proposedBooking: {
                startAt: '',
                endAt: '',
                guests: 0
            },
            model: {
                open: false
            },
            errors: {}
        }
    }
    async componentDidMount(){
        this.getBookedOutDates()
    }

    getBookedOutDates = () => {
        const {bookings} = this.props.rental;
        if(bookings && bookings.length > 0) {
            bookings.forEach(booking => {
                const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
                this.bookedOutDates.push(...dateRange)
            })
        }
    }
    checkInvalidDates = (date) => {
       return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
    }

    handleApply = (event, picker) => {
        const startAt = picker.startDate.format('Y/MM/DD')
        const endAt = picker.endDate.format('Y/MM/DD')
        this.dateRef.current.value = startAt + ' to ' + endAt;
        this.setState({
            proposedBooking:{
                ...this.state.proposedBooking,
                startAt,
                endAt
            }
        })
    }

    selectGuests = (event) => {
        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
            guests: parseInt(event.target.value, 10)
          }
        })
    }

    cancelConfirmation = () => {
        this.setState({
            model: {
                open: false
            }
        })
    }

    addNewBookedOutDates(booking){
        const dateRange = getRangeOfDates(booking.startAt, booking.endAt)
        console.log(dateRange)
        this.bookedOutDates.push(...dateRange)
    }

    confirmProposedData = () => {
        const { startAt, endAt } = this.state.proposedBooking
        const days = getRangeOfDates(startAt, endAt).length > 1
        const { rental } = this.props
        this.setState({
        ...this.state,
        proposedBooking: {
            ...this.state.proposedBooking,
            days,
            totalPrice: days * rental.dailyRate,
            rental
        },
        model:{
            open: true
        }
        })
    }

    reserveRental = () => {
        actions.createBooking(this.state.proposedBooking)
            .then((booking) => {
                this.addNewBookedOutDates(booking)
                this.cancelConfirmation()
                toast.success('Booking has been succesfuly created! Enjoy.')
            },
            (errors)=>{
             this.setState({errors})  
            }
            )
    }

    render() {
        const { rental } = this.props
        const { startAt, endAt, guests } = this.state.proposedBooking
        return (
            <div className='booking'>
            <ToastContainer />
                <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per day</span></h3>
                <hr></hr>
                <div className='form-group'>
                    <label htmlFor='dates'>Dates</label>
                    <DateRangePicker
                    onApply={this.handleApply}
                    isInvalidDate={this.checkInvalidDates}
                    opens='left'
                    containerStyles={{display: 'block'}}
                    >
                        <input ref={this.dateRef} id='dates' type='text' className='form-control'></input>
                    </DateRangePicker>
                </div>
                <div className='form-group'>
                    <label htmlFor='guests'>Guests</label>
                    <input onChange={this.selectGuests} type='number' className='form-control' id='guests' aria-describedby='emailHelp' placeholder=''></input>
                </div>
                <button disabled={!startAt || !endAt || !guests} onClick={this.confirmProposedData} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
                <hr></hr>
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                    More than 500 people checked this rental in last month.
        </p>
        <BookingModel 
            open={this.state.model.open} 
            closeModel={this.cancelConfirmation}
            confirmModel={this.reserveRental}
            booking={this.state.proposedBooking}
            errors={this.state.errors}
            rentalPrice={rental.dailyRate}
            />
            </div>
        )
    }
}
