

import React from "react";
import { useContext } from "react";
import { settingContext } from "../../context/settings";
import "./settings.css";
function Settings(props) {
  const { holdValues } = useContext(settingContext);
  return (
      
    <div className="setting-contianer">
      <form onSubmit={holdValues}>
        <h2 className="setting-heading">Settings</h2>
        <label className="setting-title">Show only Incompleted todos </label> <br />
        <div>

          <input type="radio" name="incomplete" value={false} /> No
          <input type="radio" name="incomplete" value={true} /> Yes
        </div>

        <br />
        <br />

        <label className="setting-title">Select number of todo's to for display</label> <br />
        <select name="pageNumber" id="">
          <option disabled>Select One</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="12">12</option>
        </select>
        <br />
        <br />
        <input type="submit" value="apply" />
      </form>
    </div>
  );
}

export default Settings;