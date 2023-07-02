import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import passport from 'passport';
import { StrategyAuthController } from '@controllers/strategy.controller';
require('../strategies/google.stratgy')
require('../strategies/facebook.strategy')

export class StrategyRoute implements Routes {  
  public router = Router();
  public strategyController = new StrategyAuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.get('/google',passport.authenticate('google', {scope:['email']}))
    this.router.get('/facebook',passport.authenticate('facebook', {scope:['public_profile','email']}))

    this.router.get('/google/callback', passport.authenticate('google',{failureRedirect:'/failed'}),function(req, res){
      
      res.redirect('/google-success'); 
    })

    this.router.get('/facebook/callback', passport.authenticate('facebook',{failureRedirect:'/failed'}),function(req, res){
      
      res.redirect('/facebook-success'); 
    })


    this.router.get('/google-success',this.strategyController.google_logIn)

    this.router.get('/facebook-success',this.strategyController.facebook_logIn)

    this.router.get('/failed', (req,res) => {
      res.status(400).send('Something went wrong!')
    })
  }
 }
