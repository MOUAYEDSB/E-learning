import React from 'react'
import { useState } from 'react';
import './container.css'

export const Container = () => {
  const [formValues, setFormValues] = useState({
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    adresse: '',
    age: '',
    children: []
  });
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


  const submitHandler = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <>
      <div className='cadre'>
        <div className='listUser'>
          <p className='list'>Pages / Admin Space</p>
          <p className='users'>Liste d'utilisateurs / Graines</p>
        </div>
        <h3 class="mb-4 pb-2 pb-md-0 mb-md-5" className='newUser'>Créer un utisateur</h3>
        <form className='createUser'>

          <div class="row">
            <div class="col-md-6 mb-4">

              <div data-mdb-input-init class="form-outline">
                <label class="form-label" for="firstName">Prénom</label>
                <input type="text" id="firstName" class="form-control form-control-lg" />
              </div>

            </div>
            <div class="col-md-6 mb-4">

              <div data-mdb-input-init class="form-outline">
                <label class="form-label" for="lastName">Nom</label>
                <input type="text" id="lastName" class="form-control form-control-lg" />
              </div>

            </div>
          </div>

          <div class="row">
            <div class="col-md-12 mb-4 d-flex align-items-center">

              <div data-mdb-input-init class="form-outline col-12">
                <label class="form-label" for="emailAddress">Email</label>
                <input type="email" id="emailAddress" class="form-control form-control-lg" />
              </div>

            </div>

          </div>

          <div class="row">
            <div class="col-md-6 mb-4 pb-2">

              <div data-mdb-input-init class="form-outline">
                <label class="form-label" for="Adresse">Adresse</label>
                <input type="text" id="adresse" class="form-control form-control-lg" />
              </div>

            </div>
            <div class="col-md-6 mb-4 pb-2">

              <div data-mdb-input-init class="form-outline">
                <label class="form-label" for="phoneNumber">Phone Number</label>
                <input type="tel" id="phoneNumber" class="form-control form-control-lg" />
              </div>

            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-4 pb-2">

              <label class="form-label select-label">Type d'utulisateur</label><br />
              <select class="select form-control-lg col-md-12 form-outline">
                <option value="1" disabled>Vous êtes</option>
                <option value="2">Parent</option>
                <option value="3">Enfant</option>
              </select>
            </div>

            <div class="col-md-6 mb-4 pb-2">

              <div data-mdb-input-init class="form-outline ">
                <label class="form-label" for="phoneNumber">Nombre d'enfants</label>
                <input type="tel" id="phoneNumber" class="form-control form-control-lg" />
              </div>

            </div>

          </div>

          <div class="row">
            <div class="col-md-12 mb-4 d-flex align-items-center">
              <div data-mdb-input-init class="form-outline col-12">
                <label class="form-label" for="form3Example4c">Mot de passe</label>
                <input type="email" id="emailAddress" class="form-control form-control-lg" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 mb-4 d-flex align-items-center">
              <div data-mdb-input-init class="form-outline col-12">
                <label class="form-label" for="form3Example4c">Confirmer votre mot de passe</label>
                <input type="email" id="emailAddress" class="form-control form-control-lg" />
              </div>
            </div>
          </div>

          <div class="row">
            <hr className='separator' />
          </div>
          <h4>Enfant</h4>
          {formValues.children.map((child, index) => (
            <>
              <br />
              <div class="row">
                <div class="col-md-6 mb-4">
                  <div data-mdb-input-init class="form-outline">
                    <label class="form-label" for="firstName">Nom</label>
                    <input type="text" id="firstName" name={child.nom} class="form-control form-control-lg" />
                  </div>

                </div>
                <div class="col-md-6 mb-4">

                  <div data-mdb-input-init class="form-outline">
                    <label class="form-label" for="lastName">Prénom</label>
                    <input type="text" id="lastName" name={child.prenom} class="form-control form-control-lg" />
                  </div>

                </div>
              </div>

              <div class="row">
                <div class="col-md-12 mb-4 d-flex align-items-center">

                  <div data-mdb-input-init class="form-outline col-12">
                    <label class="form-label" for="emailAddress">Email</label>
                    <input type="email" id="emailAddress" name={child.email} class="form-control form-control-lg" />
                  </div>

                </div>

              </div>

              <div class="row">

                <div class="col-md-6 mb-4 pb-2">

                  <div data-mdb-input-init class="form-outline">
                    <label class="form-label" for="age">Age</label>
                    <input type="tel" id="age" name={child.age} class="form-control form-control-lg" />
                  </div>
                </div>
                <div class="col-md-6 mb-4 pb-2">

                  <div data-mdb-input-init class="form-outline">
                    <label class="form-label" for="syst">Système Scolaire</label>
                    <input type="text" id="syst" name={child.educationSystem} class="form-control form-control-lg" />
                  </div>

                </div>
              </div>

              
                <button className='submit-btn' class="btn btn-outline-primary btn-sm col-md-3" type="button" onClick={() => removeChild(index)}>Supprimer Enfant</button>&nbsp;
             
            </>
            ))}
             
              <button type='button'  className="submit-btn" class="btn btn-outline-success btn-sm col-md-3" onClick={addChild}>Ajouter Enfant</button>
              

              <div class="row">
                <div class="col-md-8 mt-4 pt-2">
                  <input data-mdb-ripple-init class="btn btn-danger btn-lg col-md-4" type="submit" value="Créer" />
                </div>
              </div>

      </form >
      </div>
    </>
  )
}
