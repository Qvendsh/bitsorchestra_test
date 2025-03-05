import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookFormComponent from "../components/BookForm/BookFormComponent.tsx";
import {Book} from "../models/BookModel.ts";


const BookForm = () => {
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [book, setBook] = useState<Book>({
        title: "",
        author: "",
        category: "",
        isbn: 0
    });

    useEffect(() => {
        if (isEdit) {
            fetch(`http://localhost:5000/books/${id}`)
                .then((res) => res.json())
                .then((data) => setBook(data))
                .catch((err) => console.error("Error fetching book:", err));
        }
    }, [id, isEdit]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const currentDate = new Date().toISOString();

        const bookToSend = {
            ...book,
            updatedAt: isEdit ? currentDate : "--",
            createdAt: isEdit ? book.createdAt : currentDate,
        };

        const url = isEdit
            ? `http://localhost:5000/books/${id}`
            : "http://localhost:5000/books";

        const method = isEdit ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookToSend)
            });

            if (!response.ok) throw new Error("Failed to save book");

            await response.json();
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <BookFormComponent
            book={book}
            setBook={setBook}
            handleSubmit={handleSubmit}
            isEdit={isEdit}
        />
    );
};

export default BookForm;