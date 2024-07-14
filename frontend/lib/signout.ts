export default function handleSignOut(){
    window.localStorage.removeItem('token');
    window.open('/');
}