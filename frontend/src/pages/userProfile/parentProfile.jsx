import { useState, useEffect, useContext } from "react";
import "./userProfile.css";
import { UserContext } from "../../context/userContext.jsx";
import { assets } from "../../assets/assets"; // Assuming assets like default image are stored here

// eslint-disable-next-line react/prop-types
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

  const [selectedFile, setSelectedFile] = useState(null); // For image file
  const [imagePreview, setImagePreview] = useState(null); // Image preview
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { getUser, updateUser } = useContext(UserContext);

  // Fetch the user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(id);
        setFormValues({
          nom: userData.nom || "",
          prenom: userData.prenom || "",
          email: userData.email || "",
          tel: userData.telephone || "",
          adresse: userData.adresse || "",
          profileImgURL: userData.profileImgURL || "",
          children: userData.children || [],
        });
        setImagePreview(
          userData.profileImgURL
            ? `http://localhost:3000/${userData.profileImgURL}`
            : assets.defaultProfileImage // Default image if no profile picture
        );
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id, getUser]);

  // Handle text input changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Update preview when new file is selected
    }
  };

  // Handle form submission including image upload
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form values to FormData
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });

    // Append the image file if selected
    if (selectedFile) {
      formData.set("profileImgURL", selectedFile);
    }

    try {
      const updatedUser = await updateUser(id, formData);
      if (updatedUser) {
        setFormValues((prev) => ({
          ...prev,
          profileImgURL: updatedUser.profileImgURL || prev.profileImgURL,
        }));
        setImagePreview(
          updatedUser.profileImgURL
          ? `http://localhost:3000/${updatedUser.profileImgURL}?${new Date().getTime()}` // Add timestamp to force refresh
          : assets.defaultProfileImage
        );
      }
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      console.error("Error updating user:", errorMessage);
      setErrorMessage(errorMessage); // Set error message
    }
  };

  return (
    <div className="container">
      <label className="nav-label">Pages &gt; Espace Admin</label>
      <label className="nav-label2">
        Profiles &gt; {formValues.nom} {formValues.prenom}
      </label>
      <div className="view-wrapper user-profile-wrapper">
        <div className="user-profile-image-container">
          <div className="user-image">
            <img
              src={imagePreview || assets.defaultProfileImage}
              alt="Profile"
            />
            <span>
              {formValues.nom} {formValues.prenom}
            </span>
          </div>
          <div className="choose-image-section">
            {isEditing && (
              <input
                type="file"
                name="profileImgURL"
                accept="image/*"
                onChange={handleFileChange}
              />
            )}
          </div>
        </div>
        <div className="userProfile-info">
          <h3>Paramètres du compte</h3>
          <form onSubmit={submitHandler}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="cell">
              <div className="input-box">
                <label>Nom</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nom"
                    value={formValues.nom}
                    onChange={changeHandler}
                  />
                ) : (
                  <p>{formValues.nom}</p>
                )}
              </div>
              <div className="input-box">
                <label>Prénom</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="prenom"
                    value={formValues.prenom}
                    onChange={changeHandler}
                  />
                ) : (
                  <p>{formValues.prenom}</p>
                )}
              </div>
            </div>
            <div className="input-box">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={changeHandler}
                />
              ) : (
                <p>{formValues.email}</p>
              )}
            </div>
            <div className="input-box">
              <label>Téléphone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="tel"
                  value={formValues.tel}
                  onChange={changeHandler}
                />
              ) : (
                <p>{formValues.tel}</p>
              )}
            </div>
            <div className="input-box">
              <label>Adresse</label>
              {isEditing ? (
                <input
                  type="text"
                  name="adresse"
                  value={formValues.adresse}
                  onChange={changeHandler}
                />
              ) : (
                <p>{formValues.adresse}</p>
              )}
            </div>
            <div className="input-box">
              <label>Children</label>
              <ul>
                {formValues.children.map((child, index) => (
                  <li key={index}>{child}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="submit-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button type="submit" className="submit-btn">
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
