import React from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IRepo } from '../models/repo.model'

const RepoCard = ({ repo }: { repo: IRepo}) => {
    const { addFavourite, removeFavourite } = useActions()
    const { favourites } = useAppSelector(state => state.github)
    const isFav = favourites.includes(repo.html_url)

    const favouriteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        isFav
            ? removeFavourite(repo.html_url)    
            : addFavourite(repo.html_url)
    }

    return (
        <div className='
            border
            py-3
            px-5
            rounded
            mb-2
            hover:shadow-md
            hover:bg-gray-100
            transition-all
        '>
            <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noreferrer"
                className='
                    flex
                    justify-between
                    item-center
                '>
                
                <div >
                    <h2 className='text-lg font-bold'>{repo.full_name}</h2>
                    <p className='text-sm'>
                        Forks: <span className='font-bold mr-2'>{repo.forks}</span>
                        Watchers: <span className='font-bold'>{repo.watchers}</span>
                    </p>
                    <p className='text-sm font-thin'>{repo?.description}</p>
                </div>
                    <button 
                        className='
                            h-fit
                            bg-transparent
                            rounded
                            hover:shadow-md
                            transition-all
                            z-6
                        '
                        onClick={favouriteHandler}
                    >
                        {!isFav && '💗'}
                        {isFav && '🖤'}
                    </button>
                
            </a>
        </div>
    )
}

export default RepoCard