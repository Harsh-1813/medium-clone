import { Link } from "react-router-dom";

export interface BlogCardProps {
    id: string
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <div>
                <Avatar name={authorName} size="small" />
            </div>
            <div className="font-extralight text-sm pl-2 flex flex-col justify-center">{authorName}
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle />
            </div>
            <div className="pl-2 font-thin text-sm text-slate-400 flex flex-col justify-center">
                {publishedDate}
            </div>
        </div>
        <div className="font-bold text-3xl pt-2">
            {title}
        </div>
        <div className="font-thin text-md pt-2">
            {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-400 font-thin text-sm pt-4">
            {`${Math.ceil(content.length / 100)} min read`}
        </div>
    </div>
    </Link>
}


export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400 ">

    </div>
}


export function Avatar({ name, size }: { name: string, size: "small" | "big" }) {
    return <div className={`inline-flex items-center justify-center ${size == "small" ? "w-6 h-6" : "h-10 w-10"} overflow-hidden bg-gray-600 rounded-full `}>
        <span className={`font-medium ${size === "small" ? "text-sm" : "text-lg"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>
}