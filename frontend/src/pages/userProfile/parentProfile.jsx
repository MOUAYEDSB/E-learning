import React, { useState } from 'react';
import './userProfile.css';
import { assets } from '../../assets/assets.js';

export const ParentProfile = (id) => {
    const [formValues, setFormValues] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        adresse: '',
        age: '',
        children: []
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
        } else if (nameParts[0] === 'child') {
            // Children property
            const index = parseInt(nameParts[1]);
            const key = nameParts[2];
            const updatedChildren = formValues.children.map((child, i) =>
                i === index ? { ...child, [key]: value } : child
            );
            setFormValues({
                ...formValues,
                children: updatedChildren,
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

    const addChild = () => {
        setFormValues({
            ...formValues,
            children: [...formValues.children, { nom: '', prenom: '', age: '', educationSystem: '' }]
        });
    };

    const removeChild = (index) => {
        const updatedChildren = formValues.children.filter((_, i) => i !== index);
        setFormValues({
            ...formValues,
            children: updatedChildren
        });
    };

    return (
        <div className='container'>
            <label className="nav-label">Pages &gt; Espace Admin </label>
            <label className="nav-label2">Profiles &gt; nomParent</label>
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
                                        
                                    </div>
                                </div>
                                <hr />
                                
                                {/* -------------------  Children Section -------------------------*/}
                                <h4>Enfants</h4>
                                {formValues.children.map((child, index) => (
                                    <div key={index} className="child-section">
                                        <h5 className='child-header'>Enfant  {index + 1}</h5>
                                        <div className="cell">
                                            <div className='input-box'>
                                                <label>Nom</label>
                                                {isEditing ? <input type="text" name={`child-${index}-nom`} value={child.nom} placeholder='Nom' onChange={changeHandler} /> : <p>{child.nom}</p>}
                                            </div>
                                            <div className='input-box'>
                                                <label>Prenom</label>
                                                {isEditing ? <input type="text" name={`child-${index}-prenom`} value={child.prenom} placeholder='Prenom' onChange={changeHandler} /> : <p>{child.prenom}</p>}
                                            </div>
                                        </div>
                                        <div className="cell">
                                            <div className='input-box'>
                                                <label>Age</label>
                                                {isEditing ? <input type="text" name={`child-${index}-age`} value={child.age} placeholder='Age' onChange={changeHandler} /> : <p>{child.age}</p>}
                                            </div>
                                            <div className='input-box'>
                                                <label>Systéme educatif</label>
                                                {isEditing ? (
                                                    <select name={`child-${index}-educationSystem`} value={child.educationSystem} onChange={changeHandler}>
                                                        <option value=''>Sélectionner</option>
                                                        <option value='Tunisien'>Tunisien</option>
                                                        <option value='Canadien'>Canadien</option>
                                                        <option value='Francais'>Francais</option>
                                                    </select>
                                                ) : (
                                                    <p>{child.educationSystem}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className='input-box'>
                                            <label>Email</label>
                                            {isEditing ? <input type="email" name={`child-${index}-email`} value={child.email} placeholder='child email' onChange={changeHandler} /> : <p>{child.email}</p>}
                                        </div>
                                        {isEditing && <button className='submit-btn' type="button" onClick={() => removeChild(index)}>Remove Child</button>}
                                        <hr />
                                    </div>
                                    
                                ))}
                                {isEditing && <button type="button" className='submit-btn' onClick={addChild}>Add Child</button>}
                                
                                <button className='submit-btn' onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Enregistrer' : 'Modifier'}</button>
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
