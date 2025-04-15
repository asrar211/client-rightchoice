import { useEffect, useState } from "react"
import AdminDashboard from "../../components/Admin/AdminDashboard"
import axios from "../../services/axios"

export const Users = () => {
    const [users, setUsers] = useState(null) 
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(null)
    const [selectedUserId, setSelectedUserId] = useState(null);


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
            <div className="mt-10">
  <h2 className="text-lg font-semibold mb-4">Users</h2>
                <p>Total Users: {users.length}</p>
  <div className="flex flex-col gap-5">
    {users.map((user) => {
      const isSelected = selectedUserId === user._id;

      return (
        <div
          key={user._id}
          onClick={() =>
            setSelectedUserId((prevId) => (prevId === user._id ? null : user._id))
          }
          className={`cursor-pointer border p-3 rounded-md transition-all duration-300 hover:shadow-md ${
            isSelected ? "bg-gray-100" : ""
          }`}
        >
          <div>
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-600">Role: {user.isAdmin ? "Admin" : "User"}</p>
          </div>

          {isSelected && (
            <div className="mt-3 text-sm text-gray-700 space-y-1">
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>
            </AdminDashboard>
        </div>
    )
}
