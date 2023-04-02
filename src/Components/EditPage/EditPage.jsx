import React, { useEffect, useState } from 'react';

const RoomOptions = [
    { value: "101", label: "A1", cost: 100 },
    { value: "102", label: "A2", cost: 100 },
    { value: "103", label: "B1", cost: 80 },
    { value: "201", label: "B2", cost: 80 },
    { value: "202", label: "B3", cost: 50 },
    { value: "301", label: "C1", cost: 50 },
    { value: "302", label: "C2", cost: 50 },
    { value: "203", label: "C3", cost: 50 },
    { value: "304", label: "C4", cost: 50 },
    { value: "305", label: "C5", cost: 50 },
];

function EditPage({ host, editableBooking, updateAllBookings, ToView }) {
    const [_id, set_id] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const updateURI = `${host}hrms/updateBooking`;
    let x = {}





    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validation
        if (!name || !email || !room || !start || !end) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        x = {}
        x = {
            _id,
            name,
            email,
            roomNumber: room,
            startDateTime: start,
            endDateTime: end
        }

        console.log(editableBooking);

        updateAllBookings(editableBooking);


        await fetch(updateURI, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editableBooking),
        });


        // Reset form
        setName("");
        setEmail("");
        setRoom("");
        setStart("");
        setEnd("");
        setErrorMessage("");

        ToView();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input

                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <label>
                Room:
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
                Start Time:
                <input
                    type="datetime-local"
                    value={start}
                    onChange={(event) => setStart(event.target.value)}
                />
            </label>
            <label>
                End Time:
                <input
                    type="datetime-local"
                    value={end}
                    onChange={(event) => setEnd(event.target.value)}
                />
            </label>
            <button type="submit">Book</button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    )
}

export default EditPage;