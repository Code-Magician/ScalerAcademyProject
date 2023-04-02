import React, { useState } from "react";
import RoomOptions from "../../Constants/RoomOptions";
import '../Booking/BookingPage.css';


const BookingPage = ({ host, showConfirmation, ToConfirmation, allBookings }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const uri = `${host}hrms/bookings`;

    let formData = {};






    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !email || !room || !start || !end) {
            setErrorMessage("All the Fields are required.");
            return;
        }


        const dt1 = new Date(start), dt2 = new Date(end);
        const slotTimeInSeconds = (dt2 - dt1) / 1000;
        if (slotTimeInSeconds <= 0) {
            setErrorMessage("Booking End Date and Time must be after Booking Start Date and Time.");
            return;
        }

        for (let i = 0; i < allBookings.length; i++) {
            const roomNum = allBookings[i].roomNumber;
            let cdt1 = new Date(allBookings[i].startDateTime);
            let cdt2 = new Date(allBookings[i].endDateTime);

            if ((roomNum === room) && ((dt1 >= cdt1 && dt1 <= cdt2) || (dt2 >= cdt1 && dt2 <= cdt2))) {
                cdt1 = cdt1.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '');
                cdt2 = cdt2.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '');

                setErrorMessage(`Time slot between ${cdt1} and ${cdt2} is occupied. Please Book another.`);
                return;
            }
        }

        let amt;
        for (let i = 0; i < RoomOptions.length; i++) {
            let currRoom = RoomOptions[i];
            if (currRoom.label === room) {
                amt = currRoom.cost * Math.ceil(slotTimeInSeconds / 3600.0);
                setAmount(amt);
                console.log("Current Room cost : " + currRoom.cost);
                console.log("Time :" + Math.ceil(slotTimeInSeconds / 3600.0));
            }
        }



        formData = {
            name,
            email,
            roomNumber: room,
            startDateTime: start,
            endDateTime: end,
            amount: amt
        };

        console.log(formData);

        await createRequest();

        ToConfirmation();
    }


    const createRequest = async () => {
        try {
            await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

        } catch (error) {
            console.error(error);
        }
    }



    return (

        showConfirmation ? (
            <div className="confirmation">
                <div className="confirmation-page">

                    <div>
                        <span role="img" aria-label="checkmark">
                            &#10003;
                        </span>
                        {"  " + name + " Your booking has been confirmed!"}
                    </div>

                    <h4>{email}</h4>

                    <h4> {"For Room Number : " + room}</h4>

                    <h4>{"Total amount: " + amount}</h4>

                    <h4>
                        {
                            "Check In  : " +
                            new Date(start).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')
                        }
                    </h4>

                    <h4>
                        {
                            "Check Out  : " +
                            new Date(end).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')
                        }
                    </h4>

                </div>
            </div>
        ) :
            (<div className="booking">
                <form onSubmit={handleSubmit} className="booking-form">

                    <label style={{ color: 'green', fontWeight: 'bold' }}><h1>{"Amount : "} {start && end &&
                        (new Date(start) < new Date(end)) ?
                        Math.ceil((new Date(end) - new Date(start)) / 3600000.0) * RoomOptions.find(x => x.label === room).cost : 0}
                    </h1>
                    </label>



                    <label>
                        <input
                            placeholder="Guest name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </label>

                    <label>
                        <input
                            placeholder="Guest email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>

                    <label>
                        <select value={room} onChange={(event) => setRoom(event.target.value)}>
                            <option value="">Select a Room</option>
                            {RoomOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        <input
                            aria-placeholder="Check In"
                            type="datetime-local"
                            value={start}
                            onChange={(event) => setStart(event.target.value)}
                        />
                    </label>

                    <label>
                        <input
                            placeholder="Check Out"
                            type="datetime-local"
                            value={end}
                            onChange={(event) => setEnd(event.target.value)}
                        />
                    </label>

                    <button type="submit">Book</button>

                    {errorMessage && <p>{errorMessage}</p>}

                </form>
            </div>)
    );
};


export default BookingPage;
