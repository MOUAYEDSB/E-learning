import React, { useContext, useEffect, useState } from 'react';
import './userProfile.css';
import { assets } from '../../assets/assets.js';
import { UserContext } from '../../context/userContext.jsx';

export const KidProfile = ({ id }) => {
    const { getUser } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [formValues, setFormValues] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        adresse: '',
        age: '',
        educationSystem: '',
        parent1: {
            nom: '',
            prenom: '',
            email: '',
            tel: '',
        },
        parent2: {
            nom: '',
            prenom: '',
            email: '',
            tel: '',
        },
    });
    const [isEditing, setIsEditing] = useState(false);
    const [view, setView] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getUser(id);
                setUser(fetchedUser);
                // Update form values with fetched user data
                setFormValues({
                    nom: fetchedUser.nom || '',
                    prenom: fetchedUser.prenom || '',
                    email: fetchedUser.email || '',
                    tel: fetchedUser.telephone || '', // Ensure this is correctly referenced
                    adresse: fetchedUser.adresse || '', // Ensure this is correctly referenced
                    age: fetchedUser.age || '',
                    educationSystem: fetchedUser.educationSystem || '',


                });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]); // Ensure to include id as a dependency

    const changeHandler = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split('-');

        if (nameParts.length === 1) {
            // Simple property
            setFormValues({
                ...formValues,
                [name]: value,
            });
        } else {
            // Nested property
            const [parent, key] = nameParts;
            setFormValues({
                ...formValues,
                [parent]: {
                    ...formValues[parent],
                    [key]: value,
                },
            });
        }

        console.log(formValues);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // Add form submission logic here
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
                                        {isEditing ? <input type="text" name='prenom' value={formValues.prenom} placeholder='Prenom' onChange={changeHandler} /> : <p>{user.prenom}</p>}
                                    </div>
                                </div>
                                <div className='input-box'>
                                    <label>Email</label>
                                    {isEditing ? <input type="email" name='email' value={formValues.email} placeholder='Email' onChange={changeHandler} /> : <p>{user.email}</p>}
                                </div>

                                <div className="cell">
                                    <div className='input-box'>
                                        <label>Age</label>
                                        {isEditing ? <input type="text" name='age' value={formValues.age} placeholder='Votre age' onChange={changeHandler} /> : <p>{user.age}</p>}
                                    </div>
                                    <div className='input-box'>
                                        <label>Systéme educatif</label>
                                        {isEditing ? (
                                            <select name='educationSystem' value={formValues.educationSystem} onChange={changeHandler}>
                                                <option value=''>Sélectionner</option>
                                                <option value='Tunisien'>Tunisien</option>
                                                <option value='Canadien'>Canadien</option>
                                                <option value='Francais'>Francais</option>
                                            </select>
                                        ) : (
                                            <p>{user.systemeScolaire}</p>
                                        )}
                                    </div>
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
                        :
                        <div className='mot-de-passe-info'>
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
                        </div>}
                </div>
            </div>
        </div>
    );
};