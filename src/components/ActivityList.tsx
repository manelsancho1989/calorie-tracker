import { useMemo, Dispatch } from 'react'
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { Activity } from '../types'
import { categories } from '../data/categories'
import { ActivityActions } from '../reducers/activity-reducer'

type ActivityListProps = {
    activities: Activity[]
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {
    const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''),
        [activities])

    const isEmpty = useMemo(()=>activities.length === 0,[activities])
    return (
        <>
            <h2 className='text-4xl font-bold text-slate-600 text-center'>Comida y Actividades</h2>

            { isEmpty ? <p className='text-center my-5'>No hay actividades</p> :
            activities.map(activty => (
                <div key={activty.id} className='px-5 py-10 bg-white mt-5 flex justify-between shadow'>
                    <div className='space-y-2 relative'>
                        <p className={`absolute -top-8 -left-8 px-10 px-2 text-white uppercase font-bold ${activty.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>{categoryName(+activty.category)}</p>
                        <p className='text-2xl font-bold pt-5'>{activty.name}</p>
                        <p className='font-black text-4xl text-lime-500'>
                            {activty.calories}{' '}
                            <span>Calorias</span>
                        </p>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <button
                            onClick={()=> dispatch({type: 'set-activeID', payload:{id:activty.id}})}
                        >
                            <PencilSquareIcon
                                className='h-8 w-8 text-gray-800'
                            />
                        </button>
                        <button
                            onClick={()=> dispatch({type: 'delete-activity', payload:{id:activty.id}})}
                        >
                            <XCircleIcon
                                className='h-8 w-8 text-red-500'
                            />
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
