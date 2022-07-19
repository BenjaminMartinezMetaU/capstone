import * as React from 'react';
import './Account.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AccountSetup({data, setData}) {

  const user_name = React.createRef();
  const blurb = React.createRef();

  let navigate = useNavigate();
  const API_BASE_URL = "http://localhost:3001"

  const handleSubmit = event => {
    event.preventDefault();

    const register = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/register`, {
                "user_name" : user_name.current.value,
                "blurb" : blurb.current.value
                })
            console.log("User upd: ", res.data.currentUser)
            setData(res.data.currentUser);
            let userID = res.data.currentUser.userID;
            //go to profile page according to userID
            navigate(`/account/${userID}`);
        } catch (err) {
            alert(err)
            console.log(err)
        }
    }
    register()
}


    return (
      <div className='account-setup'>

        <form onSubmit={handleSubmit}>
            <div className="title">Account Setup</div>
            <label>
                <span>Username (required): </span>
                <input ref={user_name} required={true} defaultValue={data.user_name}>

                </input>
            </label>
            <label>
                <span>Blurb: </span>
                <textarea ref = {blurb} rows = "3" cols = "50" placeholder="Describe yourself..." >
                {data.blurb ? data.blurb : ""}

              </textarea>
            </label>
            <button type="submit">Save profile</button>
        </form>   
      
      </div>
    );
  
}
