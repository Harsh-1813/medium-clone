import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { StaffCard } from "../components/StaffCard";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    //how to make the blogs dynamic?
    //store it in state
    //store it directly here
    //store it in a context variable?????
    //we can also create our custom hook called useBlogs
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            loading....
        </div>
    }
    return <div>
        <Appbar />
        <div className="container mx-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-7 gap-0">
                <main className="lg:col-span-5 bg-white max-h-screen overflow-auto scrollbar-hide p-8 border-r">
                    <div>
                        {blogs.map(blog => <BlogCard
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate="Dec 3,2003"
                        />)}

                    </div>
                </main>
                <aside className="lg:col-span-2 bg-white p-8 max-h-screen overflow-auto scrollbar-hide border-l">
                    <div className="font-semibold">
                        Staff Picks
                    </div>
                    <div className="p-2 pl-0">
                        <StaffCard
                            id="1"
                            authorName="Harsh"
                            title="Eating With My Hands Doesn’t Make Me Less Civilised"
                            content=""
                            publishedDate="Dec 3,2003">

                            </StaffCard>
                        <StaffCard
                            id="1"
                            authorName="Harsh"
                            title="Eating With My Hands Doesn’t Make Me Less Civilised"
                            content=""
                            publishedDate="Dec 3,2003">

                            </StaffCard>
                    </div>
                </aside>
            </div>
        </div>
    </div>
}