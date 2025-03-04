import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import "./venue.css";
import { Sidebar } from "../components/sidebar";

export default function Stories() {
    const [stories, setStories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingStory, setEditingStory] = useState(null);
    const [storyData, setStoryData] = useState({
        bridename: "",
        groomname: "",
        weddingDate: "",
        venue: "",
        story: "",
        image: null,
        image2: null,
        image3: null,
        featureStory: false,
    });

    useEffect(() => {
        fetch("http://localhost:5000/api/wedding-stories")
            .then(res => res.json())
            .then(data => setStories(data))
            .catch(err => console.error("Error fetching stories:", err));
    }, []);

    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        setStoryData(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (event) => {
        setStoryData({ ...storyData, [event.target.name]: event.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(storyData).forEach(key => {
            formData.append(key, storyData[key]);
        });

        const url = editingStory
            ? `http://localhost:5000/api/edit-story/${editingStory.id}`
            : "http://localhost:5000/api/add-story";
        const method = editingStory ? "PUT" : "POST";

        fetch(url, { method, body: formData })
            .then(res => res.json())
            .then(data => {
                if (editingStory) {
                    setStories(stories.map(s => (s.id === editingStory.id ? { ...s, ...storyData } : s)));
                } else {
                    setStories([...stories, data]);
                }
                setShowModal(false);
                setEditingStory(null);
            })
            .catch(err => console.error("Error processing story:", err));
    };

    const handleEdit = (story) => {
        setStoryData({ ...story, image: null, image2: null, image3: null });
        setEditingStory(story);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this story?")) {
            fetch(`http://localhost:5000/api/delete-story/${id}`, { method: "DELETE" })
                .then(res => res.json())
                .then(() => setStories(stories.filter(s => s.id !== id)))
                .catch(err => console.error("Error deleting story:", err));
        }
    };

    return (
        <div className="stories-page p-6">
            <Sidebar />
            <div className="stories-header flex justify-between items-center mb-6">
                <h1 className="stories-title text-2xl font-bold">Wedding Stories</h1>
                <button onClick={() => { setShowModal(true); setEditingStory(null); }} className="stories-add-btn bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <FaPlus className="mr-2" /> Add Wedding Story
                </button>
            </div>

            <div className="stories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stories.map((story) => (
                    <div key={story.id} className="story-card bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src={`http://localhost:5000/uploads/${story.image}`} alt={story.bridename} className="story-image w-full h-40 object-cover" />
                        <div className="story-details p-4">
                            <h2 className="story-name font-bold text-lg">{story.bridename} & {story.groomname}</h2>
                            <p className="story-date text-gray-600">Wedding Date: {story.weddingDate}</p>
                            <p className="story-venue text-gray-600">Venue: {story.venue}</p>
                            <p className="story-text text-gray-700 mt-2">{story.story}</p>
                            <div className="story-actions flex justify-between mt-4">
                                <button onClick={() => handleEdit(story)} className="edit-btn bg-blue-500 text-white px-3 py-1 rounded-lg"><FaEdit /></button>
                                <button onClick={() => handleDelete(story.id)} className="delete-btn bg-red-500 text-white px-3 py-1 rounded-lg"><FaTrash /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="story-modal fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="story-modal-content bg-white p-6 rounded-lg w-[600px]">
                        <div className="story-modal-header flex justify-between items-center mb-4">
                            <h2 className="modal-title text-xl font-bold">{editingStory ? "Edit Story" : "Add Wedding Story"}</h2>
                            <button onClick={() => setShowModal(false)} className="modal-close text-gray-500"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="story-form grid grid-cols-2 gap-4">
                            <input type="text" name="bridename" placeholder="Bride's Name" value={storyData.bridename} onChange={handleChange} className="input-field border p-2 w-full" required />
                            <input type="text" name="groomname" placeholder="Groom's Name" value={storyData.groomname} onChange={handleChange} className="input-field border p-2 w-full" required />
                            <input type="text" name="weddingDate" placeholder="Wedding Date" value={storyData.weddingDate} onChange={handleChange} className="input-field border p-2 w-full" required />
                            <input type="text" name="venue" placeholder="Venue" value={storyData.venue} onChange={handleChange} className="input-field border p-2 w-full" required />
                            <textarea name="story" placeholder="Story" value={storyData.story} onChange={handleChange} className="input-field border p-2 w-full col-span-2" required />
                            <input type="file" name="image" onChange={handleFileChange} className="input-field border p-2 w-full" required />
                            <input type="file" name="image2" onChange={handleFileChange} className="input-field border p-2 w-full" required />
                            <input type="file" name="image3" onChange={handleFileChange} className="input-field border p-2 w-full col-span-2" required />
                            <label className="flex items-center col-span-2"><input type="checkbox" name="featureStory" checked={storyData.featureStory} onChange={handleChange} className="mr-2" /> Feature this Story</label>
                            <button type="submit" className="submit-btn bg-indigo-600 text-white px-4 py-2 rounded-lg w-full col-span-2">{editingStory ? "Update Story" : "Add Wedding Story"}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
