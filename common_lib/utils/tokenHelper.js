/* file helps us in creating and verifying the tokens  
 for more information checkout https://www.npmjs.com/package/jsonwebtoken */

 const jwt = require('jsonwebtoken');
 const config = require('./config');

 module.exports = {
    
    /* there are many strategies to create token, check above mentioned URL for 
        more information. by default jsonwebtoken uses (HMAC SHA256) algorithm to create but you can chosoe 
       anyone of the mentioned algorithms on above URL
    */
    createToken :  async (data) => {
        /* token will be expired in 1 hour
        you can also use this expression expiresIn: 60 * 60 */
        return await jwt.sign(data, config.jsonWebTokenKey, { expiresIn: '8h' });
     },
     verifyToken : async (token,cb) =>{
         return new Promise((resolve,reject)=>{
            jwt.verify(token, config.jsonWebTokenKey,(err,decoded)=>{
               if(err)
               cb(err);
               else
               cb(decoded);
            })
         })
     },
     ensureToken:(token,next)=>{

        const bearerHeader = token;
        if(typeof bearerHeader !== 'undefined')
        {
          const bearer= bearerHeader.split(" ");
          const bearerToken=bearer[1];
          req.token = bearerToken;
            // verifies secret and checks exp
          jwt.verify(req.token, config.jsonWebTokenKey, function(err, decoded) {
            // jwt.verifyToken(req.token,function(decoded){
      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });       
          }
          else {
            // if everything is good, save to request for use in other routes
              console.log("decode,",decoded.user,req.headers["id"])
              if(req.headers["id"] == decoded.user)
              {
                next();
              }
              else{
                // res.sendStatus(403);
                return res.json({ error_status:403,success: false, message: 'Forbidden.' });
              }
            }
           });
          
          // next();
        }
        else
        {
          return res.json({ error_status:403,success: false, message: 'Forbidden.' });
          
        }
     }
 }