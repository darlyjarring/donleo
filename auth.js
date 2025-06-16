```javascript
import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

document.getElementById("loginBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    const userDoc = await getDoc(doc(db, "usuarios", uid));
    if (!userDoc.exists() || userDoc.data().habilitado === false) {
      error.textContent = "Acceso no autorizado o cuenta deshabilitada";
      return;
    }
    const rol = userDoc.data().rol;
    if (rol === "cliente") window.location.href = "cliente.html";
    else window.location.href = "dashboard.html";
  } catch (e) {
    error.textContent = "Correo o contraseña incorrectos";
  }
});
```

---
