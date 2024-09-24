import { useQuery } from '@tanstack/react-query';
import './chatList.css';
import { Link } from 'react-router-dom';
// import { link } from 'fs';

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`,{
        
      }).then((res) =>
        res.json(),
      ),
  });


    return (
        <div className='chatList'>
              <span className="title">DASHBOARD</span>
              <Link to="/dashboard">Create a new Chat</Link>
              <Link to="/">Explore ChatGenius</Link>
              <Link to="/">Contact</Link>
              <hr/>
              <span className="title">RECENT CHATS</span>
                  <div className="list">
                     {isPending 
                     ? "Loading..." 
                     : error
                     ? "Something went wrong: "
                     : data?.map((chat)=>(
                      <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>

                        {chat.title}
                      </Link>
                     ))}                                           
                  </div>

                  <hr/>
              
              <div className="upgrade">
                <img src="/black.jpg" alt="" />
                <div className="texts">
                    <span>Upgrade Yourself</span>
                    <span>By using the power of ChatGenius</span>


                </div>
              </div>
              
            </div>
    );
}

export default ChatList;
