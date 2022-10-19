import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Dashboard = () => {
  //state user
  const [user, setUser] = useState({});

  //define history
  const navigate = useNavigate();

  //token
  const token = Cookies.get("token");


  //function "fetchData"
  const fetchData = async () => {

    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    //fetch user from Rest API
    await axios.get('http://localhost:8000/api/user')
      .then((response) => {
        //set response user to state
        setUser(response.data);
      })
  }

  //hook useEffect
  useEffect(() => {

    //check token empty
    if (!token) {

      //redirect login page
      navigate('/');
    }

    //call function "fetchData"
    fetchData();
  }, []);


  //function logout
  const logoutHandler = async () => {

    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    //fetch Rest API
    await axios.post('http://localhost:8000/api/logout')
      .then(() => {

        //remove token from localStorage
        // localStorage.removeItem("token");
        Cookies.remove("token");

        //redirect halaman login
        navigate('/');
      });
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
              <ul>
                <li><NavLink to='/about'>About</NavLink></li>
                <li><NavLink to='/contact'>Contact</NavLink></li>
              </ul>
              <hr />
              <button onClick={logoutHandler} className="btn btn-md btn-danger">LOGOUT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard