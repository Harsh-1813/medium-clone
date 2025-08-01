import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between py-4 px-10">
        <Link to={"/blogs"}>
            <div className="flex flex-col justify-center font-semibold text-2xl cursor-pointer">
                Medium
            </div>
        </Link>
        <div>
            <Link to={'/publish'}>
            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium 
            rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600">
                New Blog</button>
                </Link>
            <Avatar
                name="Harsh"
                size="big"
            />
        </div>
    </div>
}