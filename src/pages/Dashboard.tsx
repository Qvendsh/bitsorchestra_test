import { useState, useEffect } from 'react';
import { Book } from "../models/BookModel.ts";
import DashboardComponent from "../components/Dashboard/DashboardComponent.tsx";

const Dashboard = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filter, setFilter] = useState<"all" | "active" | "inactive">("active");

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch books');
                }
                return res.json();
            })
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const filteredBooks = books.filter(book =>
        filter === "all" ? true : filter === "active" ? book.isActive : !book.isActive
    );

    const handleDelete = (bookId: number | undefined) => {
        if (!bookId) return;
        fetch(`http://localhost:5000/books/${bookId}`, {
            method: 'DELETE',
        }).then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        }).catch(error => console.error('Error deleting book:', error));
    };

    const handleReactivate = (id: number | undefined, isActive: boolean | undefined) => {
        if (id !== undefined) {
            fetch(`http://localhost:5000/books/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !isActive })
            })
                .then(() => setBooks(prev =>
                    prev.map(book => book.id === id ? { ...book, isActive: !isActive } : book)
                ));
        }
    };

    return (
        <div>
            <DashboardComponent
                books={books}
                filteredBooks={filteredBooks}
                handleReactivate={handleReactivate}
                handleDelete={handleDelete}
                setFilter={setFilter}
            />
        </div>
    );
};

export default Dashboard;
