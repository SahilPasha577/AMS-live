import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, firestore } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { DB_COLLECTIONS } from "./database";




class Auth {


    createAccount(values) {
        return new Promise(async (resolve, reject) => {
            const { email, password, ...restValues } = values;
            // const { email, password, userType, ...restValues } = values;

            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                if (userCredential.user) {
                    await setDoc(
                        doc(firestore, DB_COLLECTIONS.USERS, userCredential?.user?.uid),
                        {
                            email,
                            // userType,
                            userId: userCredential?.user?.uid,
                            ...restValues,
                        }
                    );
                    resolve({
                        message: "Your account has been successfully created",
                        userId: userCredential?.user?.uid,

                    });
                } else {
                    console.log("something went wrong");
                    reject("something went wrong");

                }
            } catch (error) {
                alert(error);
                reject(error);

            }
        })
            .then((value) => {
                console.log("success " + value)
            })
            .catch((error) => {
                console.log("Error " + error)
            })
    }



    logInWithEmail(values) {

        return new Promise(async (resolve, reject) => {

            const { email, password } = values;

            try {


                await setPersistence(auth, browserSessionPersistence);

                const signinResponse = await signInWithEmailAndPassword(
                    auth,
                    email?.toLowerCase(),
                    password
                );

                console.log("signinResponse: ", signinResponse);

                resolve(signinResponse);
            } catch (error) {
                console.log("error: ", error);
                reject(error);
                alert(error);

            }
        })
            .then((value) => {
                console.log("success " + value)
            })
            .catch((error) => {
                console.log("Error " + error)
            })
    }



    getCurrentUser(values) {
        return new Promise(async (resolve, reject) => {
            const { id } = values || {};
            try {
                const userDocRef = doc(firestore, DB_COLLECTIONS.USERS, id);

                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    resolve({ id, ...userDocSnap.data() });
                }
            } catch (error) {
                console.log("error: ", error);
                reject(error);

            }
        });
    }



    signout() {
        return new Promise(async (resolve, reject) => {
            try {
                await signOut(auth);
            } catch (error) {
                console.log("error: ", error);
                reject(error);

            }
        });
    }
}

export const AuthService = new Auth();
