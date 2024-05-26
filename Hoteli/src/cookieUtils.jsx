import Cookies from 'js-cookie';

const cookieUtils = {
  setUserRoleInCookies: (role) => {
    Cookies.set('userRole', role, { expires: 1 }); // expires in 1 day
  },

  getUserRoleFromCookies: () => {
    return Cookies.get('userRole');
  }
};

export default cookieUtils;