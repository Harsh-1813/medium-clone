import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    //how to make the blogs dynamic?
    //store it in state
    //store it directly here
    //store it in a context variable?????
    //we can also create our custom hook called useBlogs
    const  {loading , blogs}=useBlogs();

    if(loading){
        return <div>
            loading....
        </div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}  
                    title={blog.title}
                    content={blog.content}
                    publishedDate="Dec 3,2003"
                />)}
                
            </div>
        </div>
    </div>
}