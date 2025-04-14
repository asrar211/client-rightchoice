import { useEffect, useState } from "react"
import AdminDashboard from "../../components/Admin/AdminDashboard"
import axios from "../../services/axios"

export const Users = () => {
    const [users, setUsers] = useState(null) 
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get('/api/auth')
            .then((res) => {
                setUsers(res.data) 
                setLoading(false)  
            })
            .catch((err) => {
                setError("Error fetching users data") 
                setLoading(false)  
            })
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div>
            <AdminDashboard>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Users List</h2>
                    <p>Total Users: {users.length}</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="py-2 px-4 border-b">#</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b">{index + 1}</td>
                                        <td className="py-2 px-4 border-b">{user.name}</td>
                                        <td className="py-2 px-4 border-b">{user.email}</td>
                                        <td className="py-2 px-4 border-b">{user.isAdmin ? "Admin" : "User"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminDashboard>
        </div>
    )
}
