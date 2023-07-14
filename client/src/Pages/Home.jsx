import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.TOKEN) {
        navigate("/login");
      } else {
        try {
          const response = await axios.get("http://localhost:4000/yaae", {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${cookies.TOKEN}`,
            },
          });

          const { status, user } = response.data;

          if (status && user) {
            alert(user.username);
            console.log(user.username);
            setUsername(user.username);
          } else {

            removeCookie("TOKEN");
            navigate("/login");
          }
        } catch (error) {
          console.error(error);
          removeCookie("TOKEN");
          navigate("/login");
        }
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("TOKEN");
    navigate("/login");
  };

  return (
    <div className="home_page">
      <h4>
        Welcome <span>{username}</span>
      </h4>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default Home;
