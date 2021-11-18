import jwt from 'jsonwebtoken';

export const generateJwt = (payload: any) =>  new Promise((resolve, reject) => {
        
    const secretKey:string = process.env.SECRET_KEY!;

    jwt.sign({
        data: payload,
    }, secretKey, {
        expiresIn: '10h',
    }, (error, token) => {
        if(error) {
            console.log(error)
            reject('No se pudo crear al token');
        } else {
            resolve(token);
        }
    });
    
});