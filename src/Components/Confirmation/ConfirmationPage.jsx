import React from 'react';
import '../Confirmation/ConfirmationPage.css';



function ConfirmationPage({ booking }) {
    const dtSt = new Date(booking.startDateTime).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '');
    const dtEn = new Date(booking.endDateTime).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')

    console.log(booking);

    return (
        <div className='confirmation-page'>
            <h3>{booking.name}</h3>
            <h3>{booking.email}</h3>
            For Room Number : <h4>{booking.roomNumber}</h4>
            <h1>Total amount: {booking.amount}</h1>
            <h2>{
                dtSt
            }</h2>
            <h2>{
                dtEn
            }</h2>
            <div>
                <span role="img" aria-label="checkmark">
                    &#10003;
                </span>{' '}
                Your booking has been confirmed!
            </div>
        </div>
    );
}

export default ConfirmationPage;