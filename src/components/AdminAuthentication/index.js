import { useLocation } from 'react-router-dom';

function AdminAuthentication(props) {
    const location = useLocation();
    const { pathname } = location;
    const { history } = props;

    //   // nếu đã đăng nhập mà vào page login hoặc '/' thì chuyển hướng sang màn overview.
    //   if (
    //     sessionStorage.getItem("token") &&
    //     sessionStorage.getItem("Admin") &&
    //     (pathname === "/" || pathname === "/login")
    //   ) {
    //     history.replace("/admin/overview");
    //     return "";
    //   }

    //   // chuyển hướng sang màn login nếu chưa đăng nhập mà truy cập vào các trang yêu cầu đăng nhập.
    //   // PROTECTED PAGE
    //   if (
    //     !sessionStorage.getItem("token") &&
    //     !(pathname === "/login") &&
    //     !(pathname === "/forgot-password") &&
    //     !(pathname === "/change-password")
    //   ) {
    //     history.replace("/login");
    //     return "";
    //   }

    return props.children;
}

export default AdminAuthentication;
