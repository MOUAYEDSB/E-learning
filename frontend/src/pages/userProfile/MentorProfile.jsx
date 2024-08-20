import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import './userProfile.css';

export const MentorProfile = ({ id }) => {
    const [formValues, setFormValues] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        adresse: '',
        bio: '',
        titre: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [view, setView] = useState(true);
    const [user, setUser] = useState({});
    const { getUser, updateUser } = useContext(UserContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userr = await getUser(id); // Await the getUser call
                setUser(userr); // Set the fetched user data to state
                setFormValues({
                    nom: userr.nom,
                    prenom: userr.prenom,
                    email: userr.email,
                    tel: userr.telephone,
                    adresse: userr.adresse,
                    bio: userr.bio,
                    titre: userr.titre
                });
            } catch (error) {
                console.error("Error fetching user:", error); // Handle any errors
            }
        };
        fetchUser(); // Call the async function to fetch the user
    }, [id, getUser]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, formValues); // Update the user with new data
            setIsEditing(false);
            // Optionally, you can re-fetch the user to get the latest data from the server
            const updatedUser = await getUser(id);
            setUser(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className='container'>
            <label className="nav-label">Pages &gt; Espace Admin </label>
            <label className="nav-label2">Profiles &gt; {user.nom + ' ' + user.prenom}</label>
            <div className='view-wrapper user-profile-wrapper'>
                <div className="user-profile-image-container">
                    <div className="user-image">
                        <img src={user.profileImgURL} alt="" />
                        <span>{user.nom + ' ' + user.prenom}</span>
                    </div>
                    <div className="account-info">
                        <span className={view && 'active'} onClick={() => setView(true)}>Paramétres</span>
                        <span className={!view && 'active'} onClick={() => { setView(false); setIsEditing(false) }}>Mot de passe</span>
                    </div>
                </div>
                <div className="userProfile-info">
                    {view ?
                        <>
                            <h3>Paramètre du compte</h3>
                            <form onSubmit={submitHandler}>
                                <div className="cell">
                                    <div className='input-box'>
                                        <label>Nom</label>
                                        {isEditing ? <input type="text" name='nom' placeholder='Nom' value={formValues.nom} onChange={changeHandler} /> : <p>{user.nom}</p>}
                                    </div>
                                    <div className='input-box'>
                                        <label>Prenom</label>
                                        {isEditing ? <input type="text" name='prenom' value={formValues.prenom} placeholder='prenom' onChange={changeHandler} /> : <p>{user.prenom}</p>}
                                    </div>
                                </div>
                                <div className='input-box'>
                                    <label>Email</label>
                                    {isEditing ? <input type="email" name='email' value={formValues.email} placeholder='email' onChange={changeHandler} /> : <p>{user.email}</p>}
                                </div>
                                <div className="cell">
                                    <div className='input-box'>
                                        <label>Telephone</label>
                                        {isEditing ? <input type="text" name='tel' value={formValues.tel} placeholder='telephone' onChange={changeHandler} /> : <p>{user.telephone}</p>}
                                    </div>
                                    <div className='input-box'>
                                        <label>Adresse</label>
                                        {isEditing ? <input type="text" name='adresse' value={formValues.adresse} placeholder='Votre adresse' onChange={changeHandler} /> : <p>{user.adresse}</p>}
                                    </div>
                                </div>
                                <hr />
                                <div className='input-box'>
                                    <label>Titre</label>
                                    {isEditing ? <input type="text" name='titre' value={formValues.titre} placeholder='Designer ...' onChange={changeHandler} /> : <p>{user.titre}</p>}
                                </div>
                                <div className='input-box'>
                                    <label>Bio</label>
                                    {isEditing ? <textarea type="text" name='bio' value={formValues.bio} placeholder='Bio' onChange={changeHandler} /> : <p>{user.bio}</p>}
                                </div>
                                <button className='submit-btn'>{isEditing ? 'Enregistrer' : 'Modifier'}</button>
                            </form>
                        </>
                        :
                        <>
                            <h3>Changer le mot de passe</h3>
                            <form>
                                <div className='input-box'>
                                    <label>Ancien mot de passe</label>
                                    <input type="password" placeholder='Ancien mot de passe' />
                                </div>
                                <div className='input-box'>
                                    <label>Nouveau mot de passe</label>
                                    <input type="password" placeholder='Nouveau mot de passe' />
                                </div>
                                <div className='input-box'>
                                    <label>Confirmer le mot de passe</label>
                                    <input type="password" placeholder='Confirmer le mot de passe' />
                                </div>
                                <button className='submit-btn'>Changer le mot de passe</button>
                            </form>
                        </>}
                </div>
            </div>
        </div>
    )
}
