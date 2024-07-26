import React from 'react'
import { useState } from 'react'
import './userProfile.css'
import {assets } from '../../assets/assets.js'
const userProfile = () => {

    const [formValues , setFormValues] = useState({nom: '', prenom: '', email: '',telephone: '',adresse: '',password: '',titre:''});
    const [isEditing, setIsEditing] = useState(false);

    const changeHandler = (e) => {
        e.prevent
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };
    
    const submitHandler = (e) => {
        e.preventDefault();
        setIsEditing(false);

        console.log(formValues);
    };

  return (
    <div className='userProfileContainer'>
        <div className="userProfile-image-container">
            <div className="user-image">
                <img src={assets.profileImage} alt="" />
                <h2>Youssef Ahmed</h2>
            </div>
            <div className="acount-info">
                <h3 className='active'>Compte</h3>
                <h3>Mot de passe</h3>
            </div>
        </div>

        <div className="userProfile-info">
            <h3>Paramètre du compte</h3>
            <form onSubmit={submitHandler}>
            <div className="cell">
                
                <div className='input-box'>
                    <label>Nom</label>
                    {isEditing?<input type="text" name='nom' placeholder='Nom' value={formValues.nom} onChange={changeHandler}  /> : <p>{formValues.nom}</p>}
                </div>
                
                
                <div className='input-box'>
                    <label>Prenom</label>
                    {isEditing?<input type="text" name='prenom' value={formValues.prenom} placeholder='prenom' onChange={changeHandler}  />:<p>{formValues.prenom}</p>}
                </div>
                
                
            </div>
            
            <div className='input-box'>
                <label>Email</label>
                {isEditing?<input type="email" name='email' value={formValues.email} placeholder='email' onChange={changeHandler} />:<p>{formValues.email}</p>}
            </div>
            
            <div className="cell">
                
                <div className='input-box'>
                    <label>Telephone</label>
                    {isEditing?<input type="number" name='telehone' placeholder='+216 56 987 666' value={formValues.telephone} onChange={changeHandler}  /> : <p>{formValues.telephone}</p>}
                </div>
                
                
                <div className='input-box'>
                    <label>Adresse</label>
                    {isEditing?<input type="text" name='adresse' value={formValues.adresse} placeholder='Votre adresse' onChange={changeHandler}  />:<p>{formValues.adresse}</p>}
                </div>
                
                
            </div>
            <div className='input-box'>
                <label>Titre</label>
                {isEditing?<input type="text" name='titre' value={formValues.titre} placeholder='Designer ...' onChange={changeHandler}  />:<p>{formValues.adresse}</p>}
            </div>

            <div className='input-box'>
                <label>Bio</label>
                {isEditing?<textarea type="text" name='bio' value={formValues.bio} placeholder='Bio' onChange={changeHandler}  />:<p>{formValues.bio}</p>}
            </div>
            </form>
            <button className='submit-btn' onClick={() => setIsEditing(!isEditing)}>{isEditing? 'Enregistrer' : 'Modifier'}</button>
        </div>
    </div>
  )
}

export default userProfile