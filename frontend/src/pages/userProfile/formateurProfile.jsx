import React from 'react'
import { useState } from 'react'
import './userProfile.css'
import {assets } from '../../assets/assets.js'
const FormateurProfile = () => {

    const [formValues , setFormValues] = useState({nom: '', prenom: '', email: '',tel: '',adresse: '',bio: '',titre:''});
    const [isEditing, setIsEditing] = useState(false);
    const [view,setView] = useState(true);
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
        
        console.log(formValues);
    };
    
    const submitHandler = (e) => {
        e.preventDefault();
        

        
    };

  return (
    <div className='userProfileContainer'>
        <div className="userProfile-image-container">
            <div className="user-image">
                <img src={assets.profileImage} alt="" />
                <h2>Youssef Ahmed</h2>
            </div>
            <div className="acount-info">
                <h3 className={view ? 'active' : ''} onClick={() => setView(true)}>Paramétres</h3>
                <h3 className={!view ? 'active' : ''} onClick={() => {setView(false);setIsEditing(false)}}>Mot de passe</h3>
            </div>
        </div>

        <div className="userProfile-info">
            {view?
            <><h3>Paramètre du compte</h3>
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
                    {isEditing?<input type="text" name='tel' value={formValues.tel} placeholder='telephone' onChange={changeHandler} />:<p>{formValues.tel}</p>}
                </div>
                
                
                <div className='input-box'>
                    <label>Adresse</label>
                    {isEditing?<input type="text" name='adresse' value={formValues.adresse} placeholder='Votre adresse' onChange={changeHandler}  />:<p>{formValues.adresse}</p>}
                </div>
                
                
            </div>
            
            
            <hr/>
            
            <div className='input-box'>
                <label>Titre</label>
                {isEditing?<input type="text" name='titre' value={formValues.titre} placeholder='Designer ...' onChange={changeHandler}  />:<p>{formValues.titre}</p>}
            </div>

            <div className='input-box'>
                <label>Bio</label>
                {isEditing?<textarea type="text" name='bio' value={formValues.bio} placeholder='Bio' onChange={changeHandler}  />:<p>{formValues.bio}</p>}
            </div>
                
            <button className='submit-btn' onClick={() => setIsEditing(!isEditing)}>{isEditing? 'Enregistrer' : 'Modifier'}</button>
            </form></>
            // changing password part based on the view state
            :<>
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
  )
}

export default FormateurProfile