import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { assets } from "../../assets/assets"; // Import assets from the assets file

export const MentorProfile = ({ id }) => {
  // State for form values
  const [formValues, setFormValues] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    adresse: "",
    bio: "",
    titre: "",
    profileImgURL: "", // Holds the current profile image URL
    role: "formateur", // Default role; kept in state but not displayed
  });

  // State for selected image file and preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Editing mode state
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const { getUser, updateUser } = useContext(UserContext); // User context for fetching and updating

  // Fetch user data when component mounts or ID changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(id); // Fetch user data
        if (user) {
          setFormValues({
            nom: user.nom || "",
            prenom: user.prenom || "",
            email: user.email || "",
            tel: user.telephone || "",
            adresse: user.adresse || "",
            bio: user.bio || "",
            titre: user.titre || "",
            profileImgURL: user.profileImgURL || "", // Fallback if profileImgURL is empty
            role: user.role || "formateur", // Set role from user data, default to 'formateur'
          });
          setImagePreview(
            user.profileImgURL
              ? `http://localhost:3000/${user.profileImgURL}`
              : assets.defaultProfileImage
          ); // Set initial preview image
        } else {
          console.warn(`User with id ${id} not found`);
        }
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
    const file = e.target.files[0]; // Get the selected file
    setSelectedFile(file); // Set the selected image file

    // Create a URL for the selected file and set it for preview
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create and set the URL for the preview
    }
  };

  // Handle form submission including the image upload
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(); // Create new FormData object

    // Append form values to FormData
    Object.keys(formValues).forEach((key) => {
        if (key === 'profileImgURL') {
            // Only append if it’s not an empty string
            if (formValues[key] && typeof formValues[key] === 'string') {
                formData.append(key, formValues[key]); // Append existing string URL
            } else {
                formData.append(key, ""); // Ensure it's an empty string if not available
            }
        } else {
            formData.append(key, formValues[key]); // Append other fields normally
        }
    });

    // Check if a new file is selected
    if (selectedFile) {
        formData.set("profileImgURL", selectedFile); // Use set to overwrite if a new file is selected
    }

    console.log("Form Data:", Array.from(formData.entries())); // Log what's being sent

    try {
        const updatedUser = await updateUser(id, formData); // Update user data
        if (updatedUser) {
            setFormValues((prev) => ({
                ...prev,
                profileImgURL: updatedUser.profileImgURL || prev.profileImgURL, // Update the profile image URL in state
            }));
            setImagePreview(
                updatedUser.profileImgURL
                    ? `http://localhost:3000/${updatedUser.profileImgURL}`
                    : assets.defaultProfileImage
            ); // Update the image preview
        }
        setIsEditing(false); // Exit edit mode
    } catch (error) {
        const errorMessage = error.response ? error.response.data : error.message;
        console.error("Error updating user:", errorMessage);
        setErrorMessage(errorMessage); // Set the error message
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
              src={imagePreview || assets.defaultProfileImage} // Use imagePreview if available, otherwise default
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
                style={{
                  display: "block",
                  marginTop: "-30px",
                  marginLeft: "20px",
                }}
              />
            )}
          </div>
        </div>
        <div className="userProfile-info">
          <h3>Paramètres du compte</h3>
          <form onSubmit={submitHandler}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
            {/* Display error message if any */}
            <div className="cell">
              <div className="input-box">
                <label>Nom</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nom"
                    value={formValues.nom}
                    onChange={changeHandler}
                    required // Ensure this field is filled
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
                    required // Ensure this field is filled
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
                  required // Ensure this field is filled
                />
              ) : (
                <p>{formValues.email}</p>
              )}
            </div>
            <div className="input-box">
              <label>Téléphone</label>
              {isEditing ? (
                <input
                  type="text"
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
              <label>Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formValues.bio}
                  onChange={changeHandler}
                ></textarea>
              ) : (
                <p>{formValues.bio}</p>
              )}
            </div>
            <div className="input-box">
              <label>Titre</label>
              {isEditing ? (
                <input
                  type="text"
                  name="titre"
                  value={formValues.titre}
                  onChange={changeHandler}
                />
              ) : (
                <p>{formValues.titre}</p>
              )}
            </div>
            {/* Submit and Edit/Cancel buttons */}
            <button
              type="button"
              className="submit-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Annuler" : "Modifier"}
            </button>
            {isEditing && (
              <button type="submit" className="submit-btn">
                Sauvegarder
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
