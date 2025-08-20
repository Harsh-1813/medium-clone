import { Link } from "react-router-dom";


interface UserBlogCardProps {
    id: string
    title: string;
    content: string;
    publishedDate: string;
}

export const UserBlogs = ({
    id,
    title,
    content,
    publishedDate,
}: UserBlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-4">
                <span>{publishedDate}</span>
                <span>·</span>
                <span>{`${Math.ceil(content.length / 300)} min read`}</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 group-hover:text-slate-700">
                {title}
            </h2>
            <p className="mt-2 text-slate-600 leading-relaxed">
                {content.slice(0, 100) + "..."}
            </p>
            <hr className="mt-4 border-slate-200" />
        </div>
    </Link>
}