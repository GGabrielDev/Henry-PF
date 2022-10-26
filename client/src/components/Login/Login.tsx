import { Logo } from "../Navbar";
import { AuthCard } from "./AuthCard";
import {Link} from 'react-router-dom';
import React from "react";


export function Login(){

    const handleSubmit= ()=>{

    }
    const handleChange= ( e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>)=>{

    }

    return(
        <AuthCard>

<form onSubmit={handleSubmit} autoComplete="off">
        <div className="text-center mb-2">
          <Logo/>
        </div>

        <div className="mb-2 p-1 d-flex border rounded">
          <div className="mx-2 mt-1"> 
            
          </div>
          <input
            autoFocus
            className="form-control txt-input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={ e => handleChange(e) }
          />
        </div>

        <div className="mb-2 p-1 d-flex border rounded">
          <div className="mx-2 mt-1"> 
           
          </div>
          <input
            className="form-control txt-input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={ e => handleChange(e) }
          />
        </div>

        <div className="row d-flex justify-content-between mt-3 mb-2">
          <div className="mb-3">
            <div className="form-check ms-1">
              <input
                type="checkbox"
                className="form-check-input"
                id="mycheckbox"
              />
              <label className="form-check-label" htmlFor="mycheckbox">
                Remember
              </label>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>

        <div className="mt-3 mb-3 text-center">
          <Link to="/auth/recover">Forgot Password?</Link>
        </div>

        <div className="mt-3 mb-3 text-center">
           <h6>Don´t have an account</h6>
          <Link to="/auth/register">Register</Link>
        </div>
      </form>
        </AuthCard>
    )
}