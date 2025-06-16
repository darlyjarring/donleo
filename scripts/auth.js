import { auth, db } from './firebase.js'; // Asegúrate que firebase.js esté en la misma carpeta 'scripts'
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Escuchar el evento 'submit' del formulario en lugar del 'click' del botón
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevenir el envío por defecto del formulario que recarga la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorElement = document.getElementById("error"); // Renombrado para evitar conflicto con 'error' en el catch

    // Limpiar mensajes de error anteriores
    errorElement.textContent = "";

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Intentar obtener el documento de usuario. Si no existe o está deshabilitado, denegar acceso.
        const userDoc = await getDoc(doc(db, "usuarios", uid));

        if (!userDoc.exists() || userDoc.data().habilitado === false) {
            errorElement.textContent = "Acceso no autorizado o cuenta deshabilitada. Contacte al administrador.";
            // Opcional: Cerrar sesión si el usuario no está habilitado o su documento no existe
            // await auth.signOut();
            return;
        }

        const rol = userDoc.data().rol;
        if (rol === "cliente") {
            window.location.href = "cliente.html";
        } else {
            window.location.href = "dashboard.html";
        }
    } catch (e) {
        console.error("Error durante el login:", e); // Imprime el error completo en la consola para depuración
        let errorMessage = "Ocurrió un error. Inténtelo de nuevo.";

        // Manejo de errores específicos de Firebase Authentication
        switch (e.code) {
            case 'auth/invalid-email':
                errorMessage = "El formato del correo electrónico es inválido.";
                break;
            case 'auth/user-disabled':
                errorMessage = "Este usuario ha sido deshabilitado.";
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                errorMessage = "Correo o contraseña incorrectos.";
                break;
            case 'auth/too-many-requests':
                errorMessage = "Demasiados intentos fallidos. Intente más tarde.";
                break;
            default:
                errorMessage = "Error al iniciar sesión: " + e.message; // Mensaje genérico o de Firebase
        }
        errorElement.textContent = errorMessage;
    }
});
