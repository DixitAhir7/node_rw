import React, { useState } from 'react'

export default function Writeblog() {

    const [blog, setBlog] = useState('')
    const [image, setImage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: blog, createdAt: new Date(), /* img: image */ })
            })

            if (response.ok) {
                alert('Blog created successfully!')
                setBlog('')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleImage = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result); // base64 string
        };

        reader.readAsDataURL(file);
    };
    return (
        <>
            <h1>write blog</h1>
            <form onSubmit={handleSubmit}>
                <textarea value={blog} onChange={(e) => setBlog(e.target.value)} name="blog" />
                {/* <input style={{ display: "block" }} type="file" name="image" onChange={handleImage}
                /> */}
                <button style={{ display: "block" }} type="submit">send</button>
            </form>
        </>
    )
}