import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, []);
  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          <form>
            <div className="form-group">
              <input className="wd-username form-control" value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username:  e.target.value })}/>
            </div>
            <div className="form-group">
              <input className="wd-password form-control" value={profile.password}
                    onChange={(e) => setProfile({ ...profile, password:  e.target.value })}/>
            </div>
            <div className="form-group">
              <input className="wd-firstname form-control" value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/></div>
              <div className="form-group">
              <input className="wd-lastname form-control" value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName:  e.target.value })}/></div>
              <div className="form-group">
              <input className="wd-dob form-control" value={profile.dob}
                    onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date"/></div>
              <div className="form-group">
              <input className="wd-email form-control" value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}/></div>
              <div className="form-group">
              <input 
                className="wd-role form-control" 
                value={profile.role} 
                readOnly  // Make the role field read-only
              />
            </div>
              <button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
                Sign out
              </button>
          </form>
        </div>
      )}
    </div>
  );
}

