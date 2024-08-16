import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { UserContext } from '../../context/userContext'
import './userProfile.css'
import {assets } from '../../assets/assets.js'
export const MentorProfile = ({id}) => {

    const [formValues , setFormValues] = useState({nom: '', prenom: '', email: '',tel: '',adresse: '',bio: '',titre:''});
    const [isEditing, setIsEditing] = useState(false);
    const [view,setView] = useState(true);
    const [user, setUser] = useState({});
    const { getUser } = useContext(UserContext);
    useEffect(() => {
        const fetchUser = async () => {
        try {
            const userr = await getUser(id); // Await the getUser call

            setUser(userr); // Set the fetched user data to state
        } catch (error) {
            console.error("Error fetching user:", error); // Handle any errors
        }
    };

    fetchUser(); // Call the async function to fetch the user
  }, []);
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
    <div className='container'>
        <label className="nav-label">Pages &gt; Espace Admin </label>
        <label className="nav-label2">Profiles &gt; {user.nom +' '+user.prenom}</label>
        <div className='view-wrapper user-profile-wrapper'>
            <div className="user-profile-image-container">
                <div className="user-image">
                    <img src={user.profileImgURL} alt="" />
                    <span>{user.nom +' '+user.prenom}</span>
                </div>
                <div className="account-info">
                    <span className={view && 'active'} onClick={() => setView(true)}>Paramétres</span>
                    <span className={!view && 'active'} onClick={() => {setView(false);setIsEditing(false)}}>Mot de passe</span>
                </div>
            </div>
            <div className="userProfile-info">
                {view?
                <>
                    <h3>Paramètre du compte</h3>
                    <form onSubmit={submitHandler}>
                    <div className="cell">
                        <div className='input-box'>
                            <label>Nom</label>
                            {isEditing?<input type="text" name='nom' placeholder='Nom' value={formValues.nom} onChange={changeHandler}  /> : <p>{user.nom}</p>}
                        </div>
                        <div className='input-box'>
                            <label>Prenom</label>
                            {isEditing?<input type="text" name='prenom' value={formValues.prenom} placeholder='prenom' onChange={changeHandler}  />:<p>{user.prenom}</p>}
                        </div>
                    </div>
                    <div className='input-box'>
                        <label>Email</label>
                        {isEditing?<input type="email" name='email' value={formValues.email} placeholder='email' onChange={changeHandler} />:<p>{user.email}</p>}
                    </div>
                    <div className="cell">
                        <div className='input-box'>
                            <label>Telephone</label>
                            {isEditing?<input type="text" name='tel' value={formValues.tel} placeholder='telephone' onChange={changeHandler} />:<p>{user.telephone}</p>}
                        </div>
                        <div className='input-box'>
                            <label>Adresse</label>
                            {isEditing?<input type="text" name='adresse' value={formValues.adresse} placeholder='Votre adresse' onChange={changeHandler}  />:<p>{user.adresse}</p>}
                        </div>
                    </div>
                    <hr/>
                    <div className='input-box'>
                        <label>Titre</label>
                        {isEditing?<input type="text" name='titre' value={formValues.titre} placeholder='Designer ...' onChange={changeHandler}  />:<p>{user.titre}</p>}
                    </div>
                    <div className='input-box'>
                        <label>Bio</label>
                        {isEditing?<textarea type="text" name='bio' value={formValues.bio} placeholder='Bio' onChange={changeHandler}  />:<p>{user.bio}</p>}
                    </div>
                    <button className='submit-btn' onClick={() => setIsEditing(!isEditing)}>{isEditing? 'Enregistrer' : 'Modifier'}</button>
                    </form>
                </>
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
    </div>
  )
}