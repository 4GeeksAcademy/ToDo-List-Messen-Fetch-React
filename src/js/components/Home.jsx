import React, { useEffect, useState } from "react";

const Home = () => {
	const [inputValor, setInputValor] = useState("");
	const [todos, setTodos] = useState([]);

	const URL = "https://playground.4geeks.com/todo/"
	const USERNAME = "Messen"

	async function obtenerTareas() {
		const response = await fetch(URL + "users/" + USERNAME);
		if (!response.ok) {
			createUser()
		} else {
			const data = await response.json()
			setTodos(data.todos)
		}
	}

	async function createUser() {
		await fetch(URL + "users/" + USERNAME, {
			method: "POST"
		});
		obtenerTareas()

	}

	async function enviarTareas(e) {
		e.preventDefault()
		await fetch(URL + "todos/" + USERNAME, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ "label": inputValor })

		})
		setInputValor("")
		obtenerTareas()
	}

	async function borrarTarea(id) {
		await fetch(URL + "todos/" + id, {
			method: "DELETE"
		})
		obtenerTareas()
	}

	useEffect(() => {
		obtenerTareas()
	}, [])

	return (
		<div className="container">
			<h1 className="justify-content-center d-flex my-5">ToDo List</h1>

			<div id="demo" className="p-4 col-8 mx-auto">
				<div className="input mt-3">
					<form onSubmit={(e) => enviarTareas(e)}>
						<input
							type="text"
							className="form-control"
							placeholder="Tareas por hacer"
							value={inputValor}
							onChange={(e) => setInputValor(e.target.value)}

						/>
					</form>
				</div>

				<ul className="list-group mt-3">
					{todos.length === 0 ? (
						<li className="list-group-item text-muted">
							No hay tareas, añade una
						</li>
					) : (
						todos.map((tarea) => (
							<li
								key={tarea.id}
								className="list-group-item d-flex justify-content-between"
							>
								{tarea.label}
								<span className="btn" onClick={() => borrarTarea(tarea.id)}>❌</span>
							</li>
						))
					)}
				</ul>

				<p className="mt-3 text-muted">
					{todos.length} tarea{todos.length !== 1 && "s"} pendiente{todos.length !== 1 && "s"}
				</p>
			</div>
		</div>


	);
};

export default Home;

