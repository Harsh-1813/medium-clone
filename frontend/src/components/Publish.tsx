import axios from "axios"
import { BACKEND_URL } from "../config"
import { Appbar } from "./Appbar"
import { useState, type ChangeEvent} from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="w-full max-w-screen-lg">
                <div className="mt-2">
                    <input onChange={(e) => {
                        setTitle(e.target.value)
                    }} className="block p-2.5 w-full text-sm text-gray-900  
                        rounded-lg  focus:outline-none"
                        placeholder="Title"></input>
                    <TextEditor onChange={(e) => {
                        setContent(e.target.value)
                    }} />
                </div>
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content,
                    }, {
                        headers: {
                            Authorization: `bearer ${localStorage.getItem("token")}`
                        }
                    })
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="mt-4 minline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700
                    rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div>
        <div className="pt-4 bg-white rounded-b-lg">
            <label className="sr-only">Publish post</label>
            <textarea onChange={onChange} rows={8} className="focus:outline-none block w-full text-sm text-gray-800 p-2.5 border-0 rounded-lg"
                placeholder="Write an article..." required ></textarea>
        </div>
    </div>
}