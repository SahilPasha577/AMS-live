import React from 'react'
import { Fragment, Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { useAuth } from './useAuth';
import { Navbar } from '../MyComp/Navbar';
import ProtectedRoute from './ProtectedRoute';
import { AuthLoader } from './AuthLoader';
import { PageNotFound } from './PageNotFound';
// import { Aadd } from '../MyComp/Aadd';
// import { Aview } from '../MyComp/Aview';
// import { Adelete } from '../MyComp/Adelete';
// import { Aedit } from '../MyComp/Aedit';
// import ReportGenerator from '../MyComp/ReportGenerator';




const Signin = lazy(() =>
    import("../MyComp/Signin").then((module) => ({
        default: module.Signin,
    })
    ));

const Login = lazy(() =>
    import("../MyComp/Login").then((module) => ({
        default: module.Login,
    })
    ));

const Home = lazy(() =>
    import("../MyComp/Home").then((module) => ({ default: module.Home }))
);


const Mattend = lazy(() =>
    import("../MyComp/Mattend").then((module) => ({ default: module.Mattend }))
);

const Rleaves = lazy(() =>
    import("../MyComp/Rleaves").then((module) => ({ default: module.Rleaves }))
);

const Vattend = lazy(() =>
    import("../MyComp/Vattend").then((module) => ({ default: module.Vattend }))
);

const Editpp = lazy(() =>
    import("../MyComp/Editpp").then((module) => ({ default: module.Editpp }))
);
const Aadd = lazy(() =>
    import("../MyComp/Aadd").then((module) => ({ default: module.Aadd }))
);
const Aview = lazy(() =>
    import("../MyComp/Aview").then((module) => ({ default: module.Aview }))
);
const Aedit = lazy(() =>
    import("../MyComp/Aedit").then((module) => ({ default: module.Aedit }))
);
const Adelete = lazy(() =>
    import("../MyComp/Adelete").then((module) => ({ default: module.Adelete }))
);
const ReportGenerator = lazy(() =>
    import("../MyComp/ReportGenerator").then((module) => ({ default: module.ReportGenerator }))
);
const MyAttendance = lazy(() =>
    import("../MyComp/MyAttendance").then((module) => ({ default: module.MyAttendance }))
);
const MyReportgen = lazy(() =>
    import("../MyComp/MyReportgen").then((module) => ({ default: module.MyReportgen }))
);




export const Routes = () => {

    const { isCheckingState, currentUser } = useAuth();

    console.log("current User: ", currentUser);

    const isLoggedIn = Boolean(!isCheckingState && currentUser.email !== "");
    // if (isCheckingState) return <div>Please wait...</div>;

    return (

        // <>
        //     Route
        // </>
        <Fragment>
            <Navbar
                CURRENT_USER_TYPE={currentUser.userType}
                currentUser={currentUser}
            />
            <ReactRoutes>
                <Route errorElement={<div>Page Not Found</div>}>
                    <Route
                        element={
                            <ProtectedRoute isAllowed={!isLoggedIn} redirectUrl={"/"} />
                        }
                    >
                        {/* <Route
          path={"/"}
          element={
            <Suspense fallback={<div>Please Wait...</div>}>
              <Home />
            </Suspense>
          }
        /> */}
                        <Route
                            path={"/login"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Login />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/signin"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Signin />
                                </Suspense>
                            }
                        />
                        {/* <Route
                            path={"/"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Home CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        /> */}
                    </Route>
                    <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
                        <Route
                            path={"/"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Home CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/mattend"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Mattend CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/rleaves"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Rleaves CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/vattend"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Vattend CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/editpp"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Editpp CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/aadd"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Aadd CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/aview"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Aview CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/adelete"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Adelete CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/aedit"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <Aedit CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/reportgen"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <ReportGenerator CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/myattend"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <MyAttendance CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />
                        <Route
                            path={"/myreportgen"}
                            element={
                                <Suspense fallback={<div>Please Wait...</div>}>
                                    <MyReportgen CURRENT_USER_TYPE={currentUser.userType} />
                                </Suspense>
                            }
                        />

                    </Route>
                </Route>
                <Route path="*" element={<div>Page Not Found</div>} />
            </ReactRoutes>
        </Fragment>
    )
}

export default Routes;
