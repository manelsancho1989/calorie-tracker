import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerPros = {
    activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerPros) {
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
    const caloriesSpend = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
    const netCalorie = useMemo(() => caloriesSpend - caloriesConsumed, [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center items-center">Resumen de Calorias </h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10  ">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories={caloriesSpend}
                    text="Ejercicio"
                />
                <CalorieDisplay
                    calories={netCalorie}
                    text="Diferencia"
                />
            </div>
        </>
    )
}
