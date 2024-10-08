import Cookies from 'js-cookie';
import axios from 'axios';

const cookieUtils = {
  setUserRoleInCookies: (role) => {
    Cookies.set('userRole', role, { expires: 1 }); // expires in 1 day
  },

  setUserIdInCookies: (userId) => {
    Cookies.set('userId', userId, { expires: 1 }); // expires in 1 day
  },

  setNameInCookies: (name) => {
    Cookies.set('name', name, { expires: 1 }); // expires in 1 day
  },

  setTokenInCookies: (token) => {
    Cookies.set('token', token, { expires: 1 }); // expires in 1 day
  },

  getUserIdFromCookies: () => {
    return Cookies.get('userId');
  },

  getUserRoleFromCookies: () => {
    return Cookies.get('userRole');
  },

  getNameFromCookies: () => {
    return Cookies.get('name');
  },

  getTokenFromCookies: () => {
    return Cookies.get('token');
  },

  setRefreshToken: (refreshToken) => {
    Cookies.set('refreshToken', refreshToken, { expires: 1 }); // set the refresh token with an expiration of 7 days

    // Define a function to refresh the token
    const refreshRefreshToken = async () => {
      try {
        const response = await axios.post('https://localhost:7189/api/Account/login', {
          refreshToken: Cookies.get('refreshToken')
        });

        const newRefreshToken = response.data.refreshToken;
        Cookies.set('refreshToken', newRefreshToken, { expires: 7 });
        console.log('Refresh token executed.');
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };

    // Set an interval to refresh the token every 5 minutes
    setInterval(refreshRefreshToken, 5 * 60 * 1000); // 5 minutes interval
  },

  clearUserId: () => {
    Cookies.remove('userId');
  },

  clearName: () => {
    Cookies.remove('name');
  },

  clearUserRole: () => {
    Cookies.remove('userRole');
  }
};

export default cookieUtils;
