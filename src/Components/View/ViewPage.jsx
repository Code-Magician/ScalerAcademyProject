import React, { useEffect, useState } from 'react';
import RoomOptions from '../../Constants/RoomOptions';
import "./ViewPage.css";


function ViewPage(
    {
        host,
        ToView,
        showEditablePage, ToEditable,
        showDeletePage, ToDelete,
        allBookings, setAllBookings,
        showSavedPage, ToSaved
    }) {
    const [allBks, setAllBks] = useState(allBookings);

    const [_id, set_id] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [amount, setAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [roomNumberFilter, setRoomNumberFilter] = useState("Reset");
    const [roomTypeFilter, setRoomTypeFilter] = useState("Reset");

    const updateURI = `${host}hrms/updateBooking`;
    const fetchURI = `${host}hrms/fetchBookings`;
    const deleteURI = `${host}hrms/deleteBooking`;

    let currentBooking = {}


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !email || !room || !start || !end) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        const booking = {
            _id,
            name,
            email,
            roomNumber: room,
            startDateTime: start,
            endDateTime: end
        }

        console.log(currentBooking);

        bookingUpdateForEdit();

        await fetch(updateURI, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
        });

        ToSaved();
    }

    const handleEdit = (booking) => {
        currentBooking = booking

        console.log("Current Booking In 1");
        console.log(currentBooking);

        set_id(currentBooking._id);
        setName(currentBooking.name);
        setEmail(currentBooking.email);
        setRoom(currentBooking.roomNumber);
        setStart(currentBooking.startDateTime);
        setEnd(currentBooking.endDateTime);

        ToEditable();
    }

    const handleDelete = (booking) => {
        currentBooking = booking
        console.log("booking")
        console.log(booking)
        console.log("editable booking");
        console.log(currentBooking);
        ToDelete();

        set_id(currentBooking._id);
        setName(currentBooking.name);
        setEmail(currentBooking.email);
        setRoom(currentBooking.roomNumber);
        setStart(currentBooking.startDateTime);
        setEnd(currentBooking.endDateTime);
        setAmount(currentBooking.amount);
        console.log(currentBooking.amount)
    }


    const handleYes = async () => {
        console.log(currentBooking);
        ToView();

        setAllBookings(allBookings.filter(booking => booking._id !== _id));

        const deletingObjId = {
            id: _id
        };

        const response = await fetch(deleteURI, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deletingObjId),
        });

        const data = await response.json();
        console.log(data);
    }


    const handleNo = () => {
        ToView();
    };


    const bookingUpdateForEdit = () => {
        console.log("Current booking");
        console.log(currentBooking);

        setAllBks(booking => {
            return booking.map(obj => {
                if (obj._id === _id) return currentBooking;
                else return obj;
            })
        });

        setAllBks(allBookings.sort((a, b) => new Date(a.startDateTime) > new Date(b.startDateTime)));
        console.log(allBookings);
    }


    useEffect(() => {
        const bk = allBookings;
        setAllBks(bk);

        if (roomTypeFilter !== "Reset") {
            setAllBks(allBks.filter(booking => booking.roomNumber[0] === roomTypeFilter));
        }
        else if (roomNumberFilter !== "Reset") {
            setAllBks(allBks.filter(booking => booking.roomNumber === roomNumberFilter));
        }
    }, [roomTypeFilter, roomNumberFilter]);


    const RoomNumbers = [
        { label: "Reset", value: "Reset" },
        { label: "A1", value: "A1" },
        { label: "A2", value: "A2" },
        { label: "B1", value: "B1" },
        { label: "B2", value: "B2" },
        { label: "B3", value: "B3" },
        { label: "C1", value: "C1" },
        { label: "C2", value: "C2" },
        { label: "C3", value: "C3" },
        { label: "C4", value: "C4" },
        { label: "C5", value: "C5" }
    ]

    const RoomType = [
        { label: "Reset", value: "Reset" },
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" }
    ]



    return (
        <div>
            {
                showEditablePage ?
                    (
                        <div className='edit'>
                            <form onSubmit={handleSubmit} className="edit-form">
                                <label>
                                    <input
                                        placeholder='Guest name'
                                        type="text"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </label>
                                <label>
                                    <input
                                        placeholder='Guest email'
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </label>
                                <label>
                                    <select value={room} onChange={(event) => setRoom(event.target.value)}>
                                        <option value="">Choose a room</option>
                                        {RoomOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label>
                                    <input
                                        placeholder='Check In'
                                        type="datetime-local"
                                        value={start}
                                        onChange={(event) => setStart(event.target.value)}
                                    />
                                </label>
                                <label>
                                    <input
                                        placeholder='Check Out'
                                        type="datetime-local"
                                        value={end}
                                        onChange={(event) => setEnd(event.target.value)}
                                    />
                                </label>
                                <button type="submit">Save</button>
                                {errorMessage && <p>{errorMessage}</p>}
                            </form>
                        </div>
                    ) :
                    showDeletePage ?
                        (
                            <div className="confirmation">
                                <div className='confirmation-page'>
                                    <h4>{
                                        name
                                    }</h4>
                                    <h4>{email}</h4>
                                    <h4>{"Room Number : " + room}</h4>
                                    <h4>
                                        {"Total Refund amount : " +
                                            (Date.now() <= new Date(start)) &&
                                            ((new Date(start) - Date.now()) / 3600000) < 24 ? 0 :
                                            ((new Date(start) - Date.now()) / 3600000) < 48 ? amount * 0.5 : amount
                                        }
                                        {
                                            console.log((new Date(start) - Date.now()) / 3600000.0)
                                        }
                                    </h4>
                                    <h4>
                                        {
                                            "Check In : " + new Date(start).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')
                                        }
                                    </h4>
                                    <h4>
                                        {
                                            "Check Out : " + new Date(end).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')
                                        }
                                    </h4>
                                </div>
                                <h3>{"Are you sure you want to cancel the booking?"}</h3>
                                <div >
                                    <button onClick={() => handleYes()} className="confirmation__page-buttons">Yes</button>
                                    <button onClick={handleNo} className="confirmation__page-buttons">No</button>
                                </div>
                            </div>
                        ) :
                        showSavedPage ?
                            (
                                <div className="confirmation">
                                    <div className='confirmation-page'>
                                        <h1 style={{ color: 'green' }}>Changes Saved</h1>
                                        <h4>{
                                            name
                                        }</h4>
                                        <h4>{email}</h4>
                                        <h4>{"Room Number : " + room}</h4>
                                        <h3>
                                            {"Amount : " + amount}
                                        </h3>
                                        <h4>
                                            {
                                                "Check In : " + new Date(start).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')
                                            }
                                        </h4>
                                        <h4>
                                            {
                                                "Check Out : " + new Date(end).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')
                                            }
                                        </h4>
                                    </div>
                                </div>
                            )
                            :
                            (<div className='viewpage'>
                                <div className='viewpage-heading'>
                                    <h1>Bookings List</h1>
                                </div>

                                <div className='filter'>
                                    <label placeholder='Room Number'>
                                        <select value={roomNumberFilter} onChange={(event) => setRoomNumberFilter(event.target.value)}>
                                            <option value="">Select a RoomNumber</option>
                                            {RoomNumbers.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>
                                        <select value={roomTypeFilter} onChange={(event) => setRoomTypeFilter(event.target.value)}>
                                            <option value="">Select a Room</option>
                                            {RoomType.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    {/* <label>
                                        <select value={startDateTime} onChange={(event) => setEndDateTime(event.target.value)}>
                                            <option value="">Select a Room</option>
                                            {StartTime.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>
                                        <select value={endDateTime} onChange={(event) => setStartDateTime(event.target.value)}>
                                            <option value="">Select a Room</option>
                                            {EndTime.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </label> */}
                                </div>

                                <ul className='viewpage-list'>
                                    {allBks.map((booking) => (
                                        <li key={booking._id} >
                                            {(
                                                <div className='viewpage__item-div'>
                                                    <div>{booking.name}</div>
                                                    <div>{booking.email}</div>
                                                    <div>Room Number: {booking.roomNumber}</div>
                                                    <div>Check In : {
                                                        new Date(booking.startDateTime).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')
                                                    }</div>
                                                    <div>Check Out :
                                                        {
                                                            new Date(booking.endDateTime).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')
                                                        }
                                                    </div>
                                                    <button onClick={() => handleEdit(booking)} className="viewpage__item-button">Edit</button>
                                                    {
                                                        Date.now() < new Date(booking.startDateTime) && (<button onClick={() => handleDelete(booking)} className="viewpage__item-button">Delete</button>)
                                                    }
                                                </div>
                                            )}
                                        </li>
                                    ))
                                    }
                                </ul >
                            </div >)
            }
        </div >
    );
}

export default ViewPage;