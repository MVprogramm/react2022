import { useState, useEffect } from 'react'
import RepoCard from '../components/RepoCard'
import { useDebounce } from '../hooks/debounce'
import { useSearchUsersQuery, useLazyGetUserReposQuery } from '../store/github/github.api'

const HomePage = () => {
    const [search, setSearch] = useState("")
    const [dropdown, setDropdown] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState('')
    const debounced = useDebounce(search, 1000)
    const noAvatarClass = 'fixed bg-content w-[560px] h-[560px] top-1/2 left-1/4'
    const withAvatarClass = 'fixed bg-content w-[560px] h-[560px] top-10 left-10'
    const [avatarClass, setAvatarClass] = useState(noAvatarClass)
    const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })

    const [
        fetchRepos, 
        { isLoading: areReposLoading, data: repos }
    ] = useLazyGetUserReposQuery()

    useEffect(() => {
        setDropdown(data ? debounced.length > 3 && data.length > 0 : false)
    }, [debounced, data])

    const clickHandler = (username: string) => {
        fetchRepos(username)
        setSearch('')
    }

    const overHandler = (userAvatar: string) => {
        setAvatarUrl(userAvatar)
        setAvatarClass(withAvatarClass)

        
    }

    const outHandler = () => {
        setAvatarUrl("")
        setAvatarClass(noAvatarClass)
    }
    
    return (
        <>
            {isError && <p className='
                flex
                justify-center
                items-center
                h-screen
                w-screen 
                text-red-600
            '>
                Something went wrong...
            </p>}
            {!isError && <div className='
                flex
                justify-center
                mx-auto
                overflow-x-hidden
                h-screen
                w-screen
            '>
                <div className='
                    h-screen
                    w-1/2
                '>
                    <img 
                        alt="user avatar"
                        src={avatarUrl}
                        className={avatarClass}
                    />
                </div>
                <div className='
                    flex 
                    relative 
                    justify-center 
                    pt-10 
                    w-1/2
                '>
                    <div className='relative w-[560px]'>
                        <label className="
                            w-[565px]
                            h-[130px]
                            top-0
                            left-295
                            fixed
                            bg-white
                            z-5
                        ">
                            <input 
                                type="text"
                                className="
                                    border
                                    fixed
                                    top-20
                                    left-300
                                    py-2
                                    px-4
                                    w-[560px]
                                    h-[42px]
                                    mb-2
                                    z-7
                                "
                                placeholder='Search for Github username...'
                                value={search}
                                onChange={event => setSearch(event.target.value)}
                            />
                        </label>
                        {dropdown && <ul className="
                            list-none
                            absolute
                            top-[82px]
                            left-0
                            right-0
                            max-h-[200px]
                            shadow-md
                            bg-white
                            overflow-y-scroll
                        ">
                            {isLoading && <p className='text-center'>Loading...</p>}
                            {data?.map(user => (
                                <li 
                                    key={user.id}
                                    className="
                                        py-2
                                        px-4
                                        hover:bg-gray-500
                                        hover:text-white
                                        transition-colors
                                        cursor-pointer
                                    "
                                    onClick={() => clickHandler(user.login)}
                                    onMouseOver={() => overHandler(user.avatar_url)}
                                    onMouseOut={outHandler}
                                >
                                    {user.login}
                                </li>
                            ))}
                        </ul>}

                        <div className='container mt-[90px]'>
                            { areReposLoading && <p className='text-center'>Repos are loading...</p> }
                            { repos?.map(repo => <RepoCard repo={repo} key={repo.id} />) }
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default HomePage