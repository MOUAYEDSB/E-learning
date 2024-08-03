import React from 'react'
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import Button from "@mui/material/Button";
import { Delete } from '@mui/icons-material';
import { useState } from 'react';
import './container.css'

const Container = () => {
    const [formValues, setFormValues] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        adresse: '',
        age: '',
        children: []
    });

    const listUser = [
        { index: 3, value: "Parent" },
        { index: 4, value: "Formateur" }
    ];

    const [selected, setSelected] = useState('Parent');


    const changeSelected = (e) => {
        setSelected(e.target.value);
        console.log(selected);
    }

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
        < div className='page'>
            <div className='listUser'>
                <p className='list'>Pages / Admin Space</p>
                <p className='users'>Liste d'utilisateurs / Graines</p>
            </div>
            <div className='cadre'>
                <h4 class="mb-4 pb-2 pb-md-0 mb-md-5" className='newUser'>Créer un utisateur</h4>
                <form className='createUser'>

                    <div class="row">
                        <div class="col-md-6 mb-4">

                            <div data-mdb-input-init class="form-outline">
                                <label class="form-label" for="firstName">Nom</label>
                                <input type="text" id="sizing" class="form-control form-control-lg" />
                            </div>

                        </div>
                        <div class="col-md-6 mb-4">

                            <div data-mdb-input-init class="form-outline">
                                <label class="form-label" for="lastName">Prénom</label>
                                <input type="text" id="sizing" class="form-control form-control-lg" />
                            </div>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 mb-4 d-flex align-items-center">

                            <div data-mdb-input-init class="form-outline col-12">
                                <label class="form-label" for="emailAddress">Email</label>
                                <input type="email" id="sizingl" class="form-control form-control-lg" />
                            </div>

                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-4 pb-2">

                            <div data-mdb-input-init class="form-outline">
                                <label class="form-label" for="Adresse">Adresse</label>
                                <input type="text" id="sizing" class="form-control form-control-lg" />
                            </div>

                        </div>
                        <div class="col-md-6 mb-4 pb-2">

                            <div data-mdb-input-init class="form-outline">
                                <label class="form-label" for="phoneNumber">Phone Number</label>
                                <input type="tel" id="sizing" class="form-control form-control-lg" />
                            </div>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-4 pb-2">

                            <label class="form-label select-label">Type d'utulisateur</label><br />
                            <select style={{fontSize: 21}} id="sizing" class="select form-control-lg col-md-12 form-select" onChange={changeSelected} >
                                <option key="1" disabled>Vous êtes</option>
                                {listUser.map(role => (
                                    <option key={role.index}>{role.value}</option>
                                ))}
                            </select>
                        </div>

                        {selected == "Parent" ? (
                            <div class="col-md-6 mb-4 pb-2">

                                <div data-mdb-input-init class="form-outline ">
                                    <label class="form-label" for="phoneNumber">Nombre d'enfants</label>
                                    <input type="tel" id="sizing" class="form-control form-control-lg" />
                                </div>
                            </div>
                        ) : ""}


                    </div>

                    <div class="row">
                        <div class="col-md-12 mb-4 d-flex align-items-center">
                            <div data-mdb-input-init class="form-outline col-12">
                                <label class="form-label" for="form3Example4c">Mot de passe</label>
                                <input type="email" id="sizingl" class="form-control form-control-lg" />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 mb-4 d-flex align-items-center">
                            <div data-mdb-input-init class="form-outline col-12">
                                <label class="form-label" for="form3Example4c">Confirmer votre mot de passe</label>
                                <input type="email" id="sizingl" class="form-control form-control-lg" />
                            </div>
                        </div>
                    </div>

                    {selected == "Parent" ? (
                        <>
                            <div class="row">
                                <hr className='separator' />
                            </div>
                            <h4 id="title4">Enfant</h4>
                            {formValues.children.map((child, index) => (
                                <>
                                    <br />
                                    <div class="row" key={index}>
                                        <div class="col-md-6 mb-4">
                                            <div data-mdb-input-init class="form-outline">
                                                <label class="form-label" for="firstName">Nom</label>
                                                <input type="text" id="sizing" name={child.nom} class="form-control form-control-lg" />
                                            </div>

                                        </div>
                                        <div class="col-md-6 mb-4">

                                            <div data-mdb-input-init class="form-outline">
                                                <label class="form-label" for="lastName">Prénom</label>
                                                <input type="text" id="sizing" name={child.prenom} class="form-control form-control-lg" />
                                            </div>

                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12 mb-4 d-flex align-items-center">

                                            <div data-mdb-input-init class="form-outline col-12">
                                                <label class="form-label" for="emailAddress">Email</label>
                                                <input type="email" id="sizingl" name={child.email} class="form-control form-control-lg" />
                                            </div>

                                        </div>

                                    </div>

                                    <div class="row">

                                        <div class="col-md-6 mb-4 pb-2">

                                            <div data-mdb-input-init class="form-outline">
                                                <label class="form-label" for="age">Age</label>
                                                <input type="tel" id="sizing" name={child.age} class="form-control form-control-lg" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-4 pb-2">

                                            <div data-mdb-input-init class="form-outline">
                                                <label class="form-label" for="syst">Système Scolaire</label>
                                                <select  id="sizing" name={child.educationSystem} class="form-control-lg col-md-12 form-select" >

                                                    <option value=''>Sélectionner</option>
                                                    <option value='Tunisien'>Tunisien</option>
                                                    <option value='Canadien'>Canadien</option>
                                                    <option value='Francais'>Francais</option>

                                                </select>


                                            </div>

                                        </div>
                                    </div>

                                    <Button
                                        sx={
                                            {
                                                paddingLeft: 5,
                                                paddingRight: 5,

                                            }
                                        }
                                        variant="outlined"
                                        color="error"
                                        startIcon={<Delete />}
                                        onClick={() => removeChild(index)}
                                    >
                                        Supprimer
                                    </Button>

                                    <div class="row" className="separator">
                                    </div>
                                </>
                            ))}

                            <Button
                                sx={
                                    {
                                        paddingLeft: 6,
                                        paddingRight: 6,

                                    }
                                }
                                variant="outlined"
                                color="primary"
                                startIcon={<AddTaskOutlinedIcon />}
                                onClick={addChild}
                            >
                                Ajouter
                            </Button>


                        </>
                    ) : ""}

                    {selected == "Formateur" ? (
                        <>
                            <div class="row">
                                <hr className='separator' />
                            </div>
                            <h4 id="title4">Formateur</h4>
                            <div class="row">
                                <div class="col-md-12 mb-4 d-flex align-items-center">

                                    <div data-mdb-input-init class="form-outline col-6">
                                        <label class="form-label" for="titre">Titre</label>
                                        <input type="text" id="sizing" class="form-control form-control-sm" />
                                    </div>

                                </div>

                            </div>
                            <div class="row">
                                <div class="col-md-12 mb-4 d-flex align-items-center">

                                    <div data-mdb-input-init class="form-outline col-12">
                                        <label class="form-label" for="emailAddress">Bio</label>
                                        <textarea rows="3" style={{ width: 644 }} class="form-control form-control-lg" />
                                    </div>

                                </div>

                            </div>
                        </>
                    ) : ""}

                    <div class="row">
                        <div class="col-md-8 mt-4 pt-2">
                            <input data-mdb-ripple-init id='bgc' class="btn btn-lg col-md-4" type="submit" value="Créer" />

                        </div>
                    </div>

                </form >
            </div>
        </div>
    )
}

export default Container;
