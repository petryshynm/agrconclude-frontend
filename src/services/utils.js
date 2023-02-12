export const getProfile = (token) => {
    console.log(token)
    const extractedToken = token.split('.')[1]
    const atobData = window.atob(extractedToken);
    const { email, family_name, given_name, picture } = JSON.parse(atobData);
    var payload = Buffer.from(extractedToken, 'base64');
    const obj = JSON.parse(payload.toString());
    const obj2 = { email, family_name, given_name, picture }
    console.log(obj)
    console.log(obj2)
    return {}
}