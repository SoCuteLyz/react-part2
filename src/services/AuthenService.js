import axios from "axios";

export async function EnrollFX(data) {
  return await axios.post('http://api_oh.udvc.ac.th/user/register', {
    name: data.name,
    email: data.email,
    password: data.password,
  })
  
}

export async function LoginFX(data) {
  return await axios.post('http://api_oh.udvc.ac.th/user/login', {
    email: data.email,
    password:data.password,
  })
}

export async function getProfileFX() {
  const token = JSON.parse(localStorage.getItem('token'));
  if (!token) {
    return null
  }

  return axios.get('http://api_oh.udvc.ac.th/user/me', {
    headers:{Authorization:'Bearer ' + token}
  })
}

export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('userdata');
  location.reload();
}

// export default EnrollFX