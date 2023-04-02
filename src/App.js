import { useEffect, useState } from "react";
import "./App.css";
import { BookingPage, Navbar, ViewPage } from "./Components";

function App() {
	const [allBookings, setAllBookings] = useState([]);

	const [showBooking, setShowBooking] = useState(true);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [showView, setShowView] = useState(false);
	const [showEditablePage, setShowEditablePage] = useState(false);
	const [showDeletePage, setShowDeletePage] = useState(false);
	const [showSavedPage, setShowSavedPage] = useState(false);

	const host = "http://localhost:4000/";
	const fetchURI = `${host}hrms/fetchBookings`;

	useEffect(() => {
		async function fetchData() {
			await fetch(fetchURI, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => setAllBookings(data))
				.catch((error) => console.log(error));
		}

		fetchData();
	}, [fetchURI, allBookings]);

	const ToConfirmation = () => {
		setShowConfirmation(true);
		setShowBooking(true);

		setShowView(false);
		setShowEditablePage(false);
		setShowDeletePage(false);
		setShowSavedPage(false);
	};

	const ToCreate = () => {
		setShowConfirmation(false);
		setShowBooking(true);

		setShowView(false);
		setShowEditablePage(false);
		setShowDeletePage(false);
		setShowSavedPage(false);
	};

	const ToView = () => {
		setShowConfirmation(false);
		setShowBooking(false);

		setShowView(true);
		setShowEditablePage(false);
		setShowDeletePage(false);
		setShowSavedPage(false);
	};

	const ToEditable = () => {
		setShowConfirmation(false);
		setShowBooking(false);

		setShowView(true);
		setShowEditablePage(true);
		setShowDeletePage(false);
		setShowSavedPage(false);
	};

	const ToDelete = () => {
		setShowConfirmation(false);
		setShowBooking(false);

		setShowView(true);
		setShowEditablePage(false);
		setShowDeletePage(true);
		setShowSavedPage(false);
	};

	const ToSaved = () => {
		setShowConfirmation(false);
		setShowBooking(false);

		setShowView(true);
		setShowEditablePage(false);
		setShowDeletePage(false);
		setShowSavedPage(true);
	};

	return (
		<div className="App">
			<Navbar
				ToCreate={ToCreate}
				ToView={ToView}
			/>

			{showBooking && (
				<BookingPage
					host={host}
					showConfirmation={showConfirmation}
					ToConfirmation={ToConfirmation}
					allBookings={allBookings}
				/>
			)}

			{showView && (
				<ViewPage
					host={host}
					ToView={ToView}
					showEditablePage={showEditablePage}
					ToEditable={ToEditable}
					showDeletePage={showDeletePage}
					ToDelete={ToDelete}
					allBookings={allBookings}
					setAllBookings={setAllBookings}
					showSavedPage={showSavedPage}
					ToSaved={ToSaved}
				/>
			)}
		</div>
	);
}

export default App;
