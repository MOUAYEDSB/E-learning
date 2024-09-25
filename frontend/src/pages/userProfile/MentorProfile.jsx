import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';

export const MentorProfile = ({ id }) => {
    const [formValues, setFormValues] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        adresse: '',
        bio: '',
        titre: '',
        profileImgURL: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [view, setView] = useState(true);
    const { getUser, updateUser } = useContext(UserContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser(id);
                setFormValues({
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email,
                    tel: user.telephone,
                    adresse: user.adresse,
                    bio: user.bio,
                    titre: user.titre,
                    profileImgURL: user.profileImgURL
                });
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [id, getUser]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            await updateUser(id, formValues); // Call the updateUser function
            setIsEditing(false); // Exit edit mode after successful update
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const passwordChangeHandler = (e) => {
        e.preventDefault();
        // Handle password change logic here
        console.log("Password change request");
    };

    return (
        <div className="container">
            <label className="nav-label">Pages &gt; Espace Admin</label>
            <label className="nav-label2">Profiles &gt; {formValues.nom} {formValues.prenom}</label>
            <div className="view-wrapper user-profile-wrapper">
                <div className="user-profile-image-container">
                    <div className="user-image">
                        <img
                            src={`http://localhost:3000/${formValues.profileImgURL}`} // Ensure URL is constructed correctly
                            alt={`${formValues.nom} ${formValues.prenom}`}
                            onError={(e) => { e.target.src = '/path/to/default-image.jpg'; }} // Fallback image
                        />
                        <span>{formValues.nom} {formValues.prenom}</span>
                    </div>
                    <div className="account-info">
                        <span className={view ? 'active' : ''} onClick={() => setView(true)}>Paramètres</span>
                        <span className={!view ? 'active' : ''} onClick={() => { setView(false); setIsEditing(false); }}>Mot de passe</span>
                    </div>
                </div>
                <div className="userProfile-info">
                    {view ? (
                        <>
                            <h3>Paramètres du compte</h3>
                            <form onSubmit={submitHandler}>
                                <div className="cell">
                                    <div className="input-box">
                                        <label>Nom</label>
                                        {isEditing ?
                                            <input type="text" name="nom" value={formValues.nom} onChange={changeHandler} />
                                            : <p>{formValues.nom}</p>}
                                    </div>
                                    <div className="input-box">
                                        <label>Prénom</label>
                                        {isEditing ?
                                            <input type="text" name="prenom" value={formValues.prenom} onChange={changeHandler} />
                                            : <p>{formValues.prenom}</p>}
                                    </div>
                                </div>
                                <div className="input-box">
                                    <label>Email</label>
                                    {isEditing ?
                                        <input type="email" name="email" value={formValues.email} onChange={changeHandler} />
                                        : <p>{formValues.email}</p>}
                                </div>
                                <div className="cell">
                                    <div className="input-box">
                                        <label>Téléphone</label>
                                        {isEditing ?
                                            <input type="text" name="tel" value={formValues.tel} onChange={changeHandler} />
                                            : <p>{formValues.tel}</p>}
                                    </div>
                                    <div className="input-box">
                                        <label>Adresse</label>
                                        {isEditing ?
                                            <input type="text" name="adresse" value={formValues.adresse} onChange={changeHandler} />
                                            : <p>{formValues.adresse}</p>}
                                    </div>
                                </div>
                                <hr />
                                <div className="input-box">
                                    <label>Titre</label>
                                    {isEditing ?
                                        <input type="text" name="titre" value={formValues.titre} onChange={changeHandler} />
                                        : <p>{formValues.titre}</p>}
                                </div>
                                <div className="input-box">
                                    <label>Bio</label>
                                    {isEditing ?
                                        <input type='text' name="bio" value={formValues.bio} onChange={changeHandler} />
                                        : <p >{formValues.bio}</p>}
                                </div>
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
                            <h3>Changer le mot de passe</h3>
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
