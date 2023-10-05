import { createContext, useEffect, useContext, useState } from "react";
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { auth, provider, db } from "../firebase";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const AbgContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AbgProvider = ({ children }) => {
  const [abogado, setAbg] = useState([]);
  const [expediente, setExp] = useState([]);
  const [clientes, setClient] = useState([]);
  const [currentUserClient, setCurrentUserClient] = useState(null);
  const [currentUserAbg, setCurrentUserAbg] = useState(null);
  const [error, setError] = useState(null);
  const [errorM, setErrorM] = useState(null);

  //Atraer abogados
  useEffect(() => {
    const getAbg = async () => {
      const querySnapshot = await getDocs(collection(db, "abogado"));

      setAbg(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              ...doc.data(),
            },
          };
        })
      );
    };
    getAbg();
  }, []);

  //Traer expediente
  useEffect(() => {
    const getExpediente = async () => {
      const querySnapshot = await getDocs(collection(db, "expediente"));

      setExp(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            data: {
              autor: doc.data().autor,
              body: doc.data().body,
              categoria: doc.data().categoria,
              ci: doc.data().ci,
              cliente: doc.data().cliente,
              estatus: doc.data().estatus,
              exp: doc.data().exp,
              mailclient: doc.data().mailclient,
              postedOn: doc.data().postedOn.toDate(),
              resumen: doc.data().resumen,
              file: doc.data().file,
            },
          };
        })
      );
    };
    getExpediente();
  }, []);

  //traer los datos de base de datos de cliente
  useEffect(() => {
    const getClient = async () => {
      const querySnapshot = await getDocs(collection(db, "clientes"));

      setClient(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              ...doc.data(),
            },
          };
        })
      );
    };
    getClient();
  }, [clientes]);

  //add abg to firebase
  const addAbgToFireBase = async (user) => {
    const docRef = doc(db, `clientes/${email}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // El usuario ya existe, no se necesita agregarlo nuevamente
      return;
    }
    await setDoc(docRef, {
      email: user.email,
      name: user.displayName,
      //imageUrl: user.photoURL,
    });
  };

  //add client to firebase
  const addClientToFireBase = async (user) => {
    console.log(user);
    const docRef = doc(db, "clientes", user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // El usuario ya existe, no se necesita agregarlo nuevamente
      return;
    }
    await setDoc(docRef, {
      email: user.email,
      name: user.displayName,
      imageUrl: user.photoURL,
    });
  };

  //Sign in Lawyer Google
  const handleAbgAuth = async () => {
    const userData = await signInWithPopup(auth, provider);
    const user = userData.user;
    console.log(user);
    console.log(user.email);

    // Verificar que el correo electrónico es el que se espera
    if (
      user.email !== "igorberroteran@gmail.com" &&
      user.email !== "wp291291@gmail.com"
    ) {
      alert("Acceso no autorizado");

      await signOut(auth); // Cerrar sesión si el correo electrónico no es el correcto
      return;
    }
    setCurrentUserAbg(user);
    addAbgToFireBase(user);
  };

  //Authentication Client Google
  const handleClientAuth = async () => {
    const userData = await signInWithPopup(auth, provider);
    const user = userData.user;
    console.log(user);
    setCurrentUserClient(user);
    addClientToFireBase(user);
  };

  //Loggin Abogado with email and password
  //Authentication Abogado Email
  const logginAbg = async () => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("User logged in:", user.uid);

      // Escuchar cambios en la autenticación del usuario
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("User is logged in:", user.uid);
        } else {
          console.log("User is logged out");
        }
      });

      // Resto del código
    } catch (error) {
      console.error(error);
      setErrorM("Ha ocurrido un error al iniciar sesión");
    }
  };

  //Loggin Client with email and password
  //Authentication Client Email
  // Loggin Client with email and password
  // Loggin Client with email and password
  // Iniciar sesión con email y contraseña
  const logginClient = async () => {
    // Obtener el email y la contraseña del usuario
    const email = "email_del_usuario";
    const password = "el_password_del_usuario";
    // Obtener la instancia de Firebase Auth
    const auth = getAuth();
    try {
      // Usar la función signInWithEmailAndPassword de Firebase Auth
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      // Obtener el usuario autenticado
      const user = userCredential.user;
      // Establecer el usuario actual en el estado
      setCurrentUserClient(user);

      // Verificar si el perfil ya está registrado en la base de datos
      const docRef = getDocs().doc(`clientes/${email}`);
      const docSnap = await docRef.get();
      if (docSnap.exists()) {
        // Mostrar un mensaje de éxito si el perfil existe
        setError("El perfil se ha iniciado sesión de forma exitosa");
      } else {
        // Mostrar un mensaje de error si el perfil no existe
        setError("El perfil no está registrado");
      }
    } catch (error) {
      // Mostrar un mensaje de error si ocurre algún problema
      setError("Error al iniciar sesión");
    }
  };

  //Funcion Register Cliente
  const RegistrerClient = async (email, password, name) => {
    const auth = getAuth();

    try {
      // verificar si el usuario ya existe en la base de datos
      const docRef = doc(db, "clientes", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setError("El usuario ya existe");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await addClientToFireBase(user);

      // Autenticar al usuario después de registrar su perfil
      const userData = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUserClient(userData.user);

      setError("El perfil se ha registrado de forma exitosa");
    } catch (error) {
      setError("Error al registrar el perfil");
    }
  };

  //Funcion Register Abogado
  const RegistrerAbg = async (email, password, name) => {
    const auth = getAuth();

    try {
      // verificar si el usuario ya existe en la base de datos
      const docRef = doc(db, "abogado", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setError("El usuario ya existe");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await addClientToFireBase(user);

      // Autenticar al usuario después de registrar su perfil
      const userData = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUserClient(userData.user);

      setError("El perfil se ha registrado de forma exitosa");
    } catch (error) {
      setError("Error al registrar el perfil");
    }
  };

  return (
    <AbgContext.Provider
      value={{
        abogado,
        expediente,
        clientes,
        currentUserAbg,
        setCurrentUserAbg,
        currentUserClient,
        handleAbgAuth,
        handleClientAuth,
        RegistrerClient,
        logginClient,
        RegistrerAbg,
        logginAbg,
      }}
    >
      {" "}
      {children}
    </AbgContext.Provider>
  );
};

export { AbgContext, AbgProvider };
