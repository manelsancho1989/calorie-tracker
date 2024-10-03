type calorieDisplayProps = {
    calories: number,
    text: string
}

export default function CalorieDisplay({ calories, text }: calorieDisplayProps) {
    return (
        <p className="text-white font-bold rounded-full grid grid-1 gap-3 text-center">
            <span className="font-black text-6xl text-orange-400">{calories}</span>
            {text}
        </p>
    )
}
