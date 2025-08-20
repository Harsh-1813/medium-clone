import { Link } from "react-router-dom";
import { Avatar, type BlogCardProps } from "./BlogCard";

export const StaffCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <div className="mt-4">
    <Link to={`/blog/${id}`}>
        <div className="flex">
            <Avatar name={`${authorName}`} size="small" />
            <div className="ml-2 flex-col justify-center flex text-sm font-extralight">
                Harsh
            </div>
        </div>
        <div className="flex-col justify-center flex pt-2 font-bold text-lg max-w-screen">
            {title}
        </div>
        <div className="flex-col justify-center flex pt-2  text-xs font-extralight max-w-screen pb-2">
            {publishedDate}
        </div>
    </Link>
    </div>
}