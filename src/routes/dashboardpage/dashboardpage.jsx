import { useMutation, useQueryClient } from '@tanstack/react-query';
import './dashboardpage.css';
import {useAuth} from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // Getting the user from Clerk
  const { userId } = useAuth(); // Un-commented to get the userId

  // Access the client
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  // Using react-query for the mutation
  const mutation = useMutation({
    mutationFn: async(text) => {
      
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials:true,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, text }), // Sending the userId and text
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['userChats'] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    console.log("Env value",import.meta.env.VITE_API_URL);
    console.log("Hi")
    e.preventDefault(); // Prevents the page from reloading
    const text = e.target.text.value;
    if (!text) return;
    mutation.mutate(text);
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/black.jpg" alt="" />
          <h1>ChatGenius</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
