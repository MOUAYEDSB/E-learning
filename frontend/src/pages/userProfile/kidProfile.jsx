import React, { useState } from 'react';
import './userProfile.css';
import { assets } from '../../assets/assets.js';

export const KidProfile = (id) => {
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
            <label className="nav-label2">Profiles &gt; nomGraines</label>
            <div className='view-wrapper user-profile-wrapper'>
                <div className="user-profile-image-container">
                    <div className="user-image">
                        <img src={assets.profileImageUser} alt="" />
                        <span>Youssef Ahmed</span>
                    </div>
                    <div className="account-info">
                        <span className={view && 'active'} onClick={() => setView(true)}>Paramétres</span>
                        <span className={!view && 'active'} onClick={() => {setView(false);setIsEditing(false)}}>Mot de passe</span>
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
                                        {isEditing ? <input type="text" name='nom' placeholder='Nom' value={formValues.nom} onChange={changeHandler} /> : <p>{formValues.nom}</p>}
                                    </div>
                                    <div className='input-box'>
                                        <label>Prenom</label>
                                        {isEditing ? <input type="text" name='prenom' value={formValues.prenom} placeholder='Prenom' onChange={changeHandler} /> : <p>{formValues.prenom}</p>}
                                    </div>
                                </div>
                                <div className='input-box'>
                                    <label>Email</label>
                                    {isEditing ? <input type="email" name='email' value={formValues.email} placeholder='Email' onChange={changeHandler} /> : <p>{formValues.email}</p>}
                                </div>
                                <div className="cell">
                                    <div className='input-box'>
                                        <label>Telephone</label>
                                        {isEditing ? <input type="text" name='tel' value={formValues.tel} placeholder='Telephone' onChange={changeHandler} /> : <p>{formValues.tel}</p>}
                                    </div>
                                    <div className='input-box'>
                                        <label>Adresse</label>
                                        {isEditing ? <input type="text" name='adresse' value={formValues.adresse} placeholder='Votre adresse' onChange={changeHandler} /> : <p>{formValues.adresse}</p>}
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className='input-box'>
                                        <label>Age</label>
                                        {isEditing ? <input type="text" name='age' value={formValues.age} placeholder='Votre age' onChange={changeHandler} /> : <p>{formValues.age}</p>}
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
                                            <p>{formValues.educationSystem}</p>
                                        )}
                                    </div>
                                </div>
                                <hr />
                                {/*------------------------------- Parent 1 ------------------------------- */}
                                <h4>Parent 1</h4>
                                <div className="cell">
                                    <div className='input-box'>
                                        <label>Nom</label>
                                        {isEditing ? <input type="text" name='parent1-nom' value={formValues.parent1.nom} placeholder='Nom' onChange={changeHandler} /> : <p>{formValues.parent1.nom}</p>}
                                    </div>
                                    <div className='input-box'>
                                        <label>Prenom</label>
                                        {isEditing ? <input type="text" name='parent1-prenom' value={formValues.parent1.prenom} placeholder='Prenom' onChange={changeHandler} /> : <p>{formValues.parent1.prenom}</p>}
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className='input-box'>
                                        <label>Email</label>
                                        {isEditing ? <input type="email" name='parent1-email' value={formValues.parent1.email} placeholder='Email' onChange={changeHandler} /> : <p>{formValues.parent1.email}</p>}
                                    </div>
                                    <div className='input-box'>
                                        <label>Telephone</label>
                                        {isEditing ? <input type="text" name='parent1-tel' value={formValues.parent1.tel} placeholder='Telephone' onChange={changeHandler} /> : <p>{formValues.parent1.tel}</p>}
                                    </div>
                                </div>
                                {/* -------------------  Parent 2 -------------------------*/}
                                <h4>Parent 2</h4>
                                <div className="cell">
                                    <div className='input-box'>
                                        <label>Nom</label>
                                        {isEditing ? <input type="text" name='parent2-nom' value={formValues.parent2.nom} placeholder='Nom' onChange={changeHandler} /> : <p>{formValues.parent2.nom}</p>}
                                    </div>
                                    <div className='input-box'>
                                        <label>Prenom</label>
                                        {isEditing ? <input type="text" name='parent2-prenom' value={formValues.parent2.prenom} placeholder='Prenom' onChange={changeHandler} /> : <p>{formValues.parent2.prenom}</p>}
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className='input-box'>
                                        <label>Email</label>
                                        {isEditing ? <input type="email" name='parent2-email' value={formValues.parent2.email} placeholder='Email' onChange={changeHandler} /> : <p>{formValues.parent2.email}</p>}
                                    </div>
                                    <div className='input-box'>
                                        <label>Telephone</label>
                                        {isEditing ? <input type="text" name='parent2-tel' value={formValues.parent2.tel} placeholder='Telephone' onChange={changeHandler} /> : <p>{formValues.parent2.tel}</p>}
                                    </div>
                                </div>
                                <button className='submit-btn' type="button" onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Enregistrer' : 'Modifier'}</button>
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
}
