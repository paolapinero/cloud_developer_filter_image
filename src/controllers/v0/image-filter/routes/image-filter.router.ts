import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL} from './util/util';
const request = require("request");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const router: Router = Router();

router.get("/filteredimage?:image_url",async (req: Request, res: Response)=> {
  if(!req.query.image_url){
    return res.status(404).send('The image url is required');
  }
  const image_url = req.query.image_url;
  const extensions = /(.jpg|.jpeg|.png)$/i;
  if(!extensions.exec(image_url)){
    return res.status(400).send('The image can only have the extensions .jpeg/.jpg/.png only.');
  }   
 
  try {
    let imageFiltered  = await filterImageFromURL(image_url);
    return res.sendFile(imageFiltered);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error); 
  }
  
  
})

export const ImageFilter: Router = router;