import React, { useState, useEffect, useContext } from "react";
import "./userProfile.css";
import { UserContext } from "../../context/userContext.jsx";

export const ParentProfile = ({ id }) => {
  const [formValues, setFormValues] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    adresse: "",
    profileImgURL: "",
    children: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState(true);
  const [user, setUser] = useState({});
  const { getUser, updateUser } = useContext(UserContext);

  // Fetch the user data and populate the form values on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(id);
        setUser(userData);
        setFormValues({
          nom: userData.nom || "",
          prenom: userData.prenom || "",
          email: userData.email || "",
          tel: userData.telephone || "",
          adresse: userData.adresse || "",
          profileImgURL: userData.profileImgURL || "",
          children: userData.children || [],
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id, getUser]);

  // Change handler for input fields
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Submit the form values
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, formValues); // Call updateUser to save the changes
      setIsEditing(true); // Exit edit mode after saving
      console.log("Form submitted with values:", formValues); // Debugging
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container">
      <label className="nav-label">Pages &gt; Espace Admin</label>
      <label className="nav-label2">
        Profiles &gt; {`${user.nom} ${user.prenom}`}
      </label>
      <div className="view-wrapper user-profile-wrapper">
        <div className="user-profile-image-container">
          <div className="user-image">
            <img
              src={`http://localhost:3000/${formValues.profileImgURL}`}
              alt={`${user.nom} ${user.prenom}`}
            />
            <span>{`${user.nom} ${user.prenom}`}</span>
          </div>
          <div className="account-info">
            <span
              className={view ? "active" : ""}
              onClick={() => setView(true)}
            >
              Paramétres
            </span>
            <span
              className={!view ? "active" : ""}
              onClick={() => {
                setView(false);
                setIsEditing(false);
              }}
            >
              Mot de passe
            </span>
          </div>
        </div>
        <div className="userProfile-info">
          {view ? (
            <>
              <h3>Paramètre du compte</h3>
              <form onSubmit={submitHandler}>
                <div className="cell">
                  <div className="input-box">
                    <label>Nom</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="nom"
                        placeholder="Nom"
                        value={formValues.nom}
                        onChange={changeHandler}
                      />
                    ) : (
                      <p>{formValues.nom}</p>
                    )}
                  </div>
                  <div className="input-box">
                    <label>Prenom</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="prenom"
                        value={formValues.prenom}
                        placeholder="Prenom"
                        onChange={changeHandler}
                      />
                    ) : (
                      <p>{formValues.prenom}</p>
                    )}
                  </div>
                </div>
                <div className="cell">
                  <div className="input-box">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={changeHandler}
                      />
                    ) : (
                      <p>{formValues.email}</p>
                    )}
                  </div>
                  <div className="input-box">
                    <label>Tel</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="tel"
                        placeholder="Téléphone"
                        value={formValues.tel}
                        onChange={changeHandler}
                      />
                    ) : (
                      <p>{formValues.tel}</p>
                    )}
                  </div>
                </div>
                <div className="cell">
                  <div className="input-box">
                    <label>Adresse</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="adresse"
                        placeholder="Adresse"
                        value={formValues.adresse}
                        onChange={changeHandler}
                      />
                    ) : (
                      <p>{formValues.adresse}</p>
                    )}
                  </div>
                </div>

                {/* Edit/Save Controls */}
                <button
                  type="button"
                  className="submit-btn"
                  onClick={() => setIsEditing((prev) => !prev)}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                {isEditing && <button type="submit" className="submit-btn">Save</button>}
              </form>
            </>
          ) : (
            <>
            // Password Update form can go here
              <h3>Change Password</h3>
              <form onSubmit={passwordChangeHandler}>
                <div className="input-box">
                  <label>Ancien mot de passe</label>
                  <input type="password" placeholder="Ancien mot de passe" />
                </div>
                <div className="input-box">
                  <label>Nouveau mot de passe</label>
                  <input type="password" placeholder="Nouveau mot de passe" />
                </div>
                <div className="input-box">
                  <label>Confirmer le mot de passe</label>
                  <input type="password" placeholder="Confirmer le mot de passe" />
                </div>
                <button className="submit-btn" type="submit">Changer le mot de passe</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
