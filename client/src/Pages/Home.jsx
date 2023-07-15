import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Cookies from "universal-cookie";

const Home = () => {
    const cookies = new Cookies();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const[user,Setuser]=useState();
  const token = cookies.get("TOKEN");
  useEffect(() => {
    const verifyCookie = async () => {
    
       
        console.log(token);
      if (!token) {
        console.log("1");
        navigate("/login");
      } else {
        try {
          const response = await axios.get("http://localhost:4000/yaae", {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const { status, user } = response.data;

          if (status && user) {
            // alert(user.username);
            console.log(user.username);
            Setuser(user);
            setUsername(user.username);
          } else {
            console.log("2");
            cookies.remove("TOKEN", { path: "/login" });

            navigate("/login");
          }
        } catch (error) {
            console.log("3");
          console.error(error);
          cookies.remove("TOKEN", { path: "/login" });

          navigate("/Signup");
        }
      }
    };

    verifyCookie();
  }, [cookies, navigate]);

  const handleLogout = () => {
    console.log("4");
    cookies.remove("TOKEN", { path: "/" });
    console.log(cookies.get("TOKEN"));

    if(token)
    {
        console.log("cookie is here");
        console.log(cookies.cookies.TOKEN);
    }
    else{
        console.log("cookie is not here");
    }

    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-red-100">
    {user && <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}</h2>
      {user.role === 'admin' ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">Admin Perks:</h3>
          <ul className="list-disc list-inside">
            <li className="text-blue-500">Access to all website routes</li>
            <li className="text-green-500">Manage student details</li>
            <li className="text-yellow-500">Manage elective subjects</li>
            <li className="text-purple-500">Assign subjects to students</li>
          </ul>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-2">Student Perks:</h3>
          <ul className="list-disc list-inside">
            <li className="text-blue-500">Choose elective subjects</li>
            <li className="text-green-500">Access limited routes</li>
            <li className="text-yellow-500">View selected subjects</li>
          </ul>
        </div>
      )}
    </div>
}
  </div>

  );
};

export default Home;
