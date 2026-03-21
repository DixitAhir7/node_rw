import React, { useEffect, useState } from 'react'

export default function Displayblogs() {
    const [blogs, setBlogs] = useState([])

    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:3000/blogs')
            const data = await response.json()
            setBlogs(data)
        } catch (error) {
            console.error('Error fetching blogs:', error)
        }
    }

    // Fetch all blogs on component mount
    useEffect(() => {
        fetchBlogs()
    }, [])

    const deleteBlog = async (id) => {
        try {
            await fetch(`http://localhost:3000/blogs/${id}`, { method: 'DELETE' })
            fetchBlogs()
        } catch (error) {
            console.error('Error deleting blog:', error)
        }
    }

    console.log(blogs)
    return (
        <>
            <h2>All Blogs</h2>
            {blogs.map((item) => (
                <div
                    key={item.id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        margin: '10px 0'
                    }}
                >
                    {item.image && (
                        <img
                            src={item.image}
                            alt="blog"
                            style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                        />
                    )}
                    <p>{item.content}</p>

                    <small>{new Date(item.createdAt).toLocaleString()}</small>
                    <button onClick={() => deleteBlog(item.id)}>Delete</button>
                </div>
            ))}
        </>)
}