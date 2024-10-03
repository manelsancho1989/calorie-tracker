import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuid4 } from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}
const initialState: Activity = {
    id: uuid4(),
    category: 1,
    name: '',
    calories: 0
}
export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeID) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeID)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeID])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? + e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'save-activity', payload: { newActivity: activity } })
        setActivity({
            ...initialState,
            id: uuid4(),
        })
    }
    return (
        <form
            className="space-y-5 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="category">Categoria:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    name=""
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="name">Actividad:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. comida, Jugo de naranja, Ensalada, Ejercicio, pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="calories">Calorias:</label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias. Ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                className="disabled:opacity-10 bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white"
                disabled={!isValidActivity()}
            />
        </form>
    )
}
