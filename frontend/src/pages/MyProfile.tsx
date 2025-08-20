import { Appbar } from "../components/Appbar"
import { useUserBlogs } from "../hooks"
import { UserBlogs } from "../components/UserBlogs";
import axios from "axios";

export const MyProfile = () => {
    const userId = localStorage.getItem("userId");
    const user = localStorage.getItem("user");
    const { loading, userBlogs } = useUserBlogs({
        userId: userId || ""
    });
    let insideInfo;
    let blogsCount=0;
    if (loading) {
        insideInfo = <div>loading....</div>
    }
    else {
        blogsCount=userBlogs.length;
        insideInfo = <div className="">
            {userBlogs.map(blog => <UserBlogs
                id={blog.id}
                title={blog.title}
                content={blog.content}
                publishedDate="Aug 05, 2025"
            />)}
        </div>
    }
    return <div>
        <Appbar />
        <div>
            <div className="container mx-auto ">
                {/* <!-- Main grid for desktop layout --> */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4">

                    {/* <!-- Left Column: Profile Sidebar --> */}
                    <aside className="lg:col-span-1 bg-white border-r p-6 max-h-screen overflow-auto scrollbar-hide">

                        <div className="flex flex-col items-center text-center">
                            {/* <!-- Profile Picture --> */}
                            <img
                                src="https://placehold.co/160x160/e2e8f0/334155?text=H"
                                alt="Profile Picture"
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-200 bg-slate-200 shadow-md"
                            />
                            {/* <!-- User Info --> */}
                            <div className="mt-4">
                                <h1 className="text-2xl font-bold text-slate-900">{user}</h1>
                                <p className="text-md text-slate-500 mt-1">{`@${userId}`}</p>
                            </div>

                            {/* <!-- Bio --> */}
                            <p className="text-slate-600 text-sm mt-4">
                                Description to be added for a user in further updates, need to make some changes in database.
                            </p>

                            {/* <!-- Action Buttons --> */}
                            <div className="mt-6 w-full flex flex-col gap-3">
                                <button className="w-fu(ll bg-slate-900 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-slate-700 transition-colors duration-300">
                                    Edit Profile(disabled)
                                </button>
                                <button className="w-full bg-white text-slate-900 font-medium py-2.5 px-6 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors duration-300">
                                    Share Profile(disabled)
                                </button>
                            </div>
                        </div>

                        {/* <!-- Stats Section --> */}
                        <div className="border-t border-slate-200 mt-6 pt-6">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Stats</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Posts</span>
                                    <span className="font-bold text-slate-800">{blogsCount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Followers(disabled)</span>
                                    <span className="font-bold text-slate-800">4.2k</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Following(diabled)</span>
                                    <span className="font-bold text-slate-800">310</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* <!-- Right Column: Content Area --> */}
                    <main className="lg:col-span-3 bg-white border-l max-h-screen overflow-auto scrollbar-hide">
                        {/* <!-- Content Tabs --> */}
                        <div className="border-b border-slate-200 flex text-sm font-medium text-slate-600">
                            <div className="p-4 border-b-2 border-slate-900 text-slate-900">My Posts</div>
                            {/* <a href="#" className="p-4 text-slate-500 hover:border-b-2 hover:border-slate-300 hover:text-slate-800 transition-colors">Saved</a>
                                <a href="#" className="p-4 text-slate-500 hover:border-b-2 hover:border-slate-300 hover:text-slate-800 transition-colors">Liked</a> */}
                        </div>

                        {/* <!-- Blog Post List --> */}
                        <div className="p-4 sm:p-6 lg:p-8">
                            <div className="space-y-8 max-h-auto overflow-y-auto scrollbar-hide">
                                {insideInfo}
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </div>
    </div>
}
