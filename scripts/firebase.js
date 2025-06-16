```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyArPPyaX0NoU2Gkax8bpj5MkWTLMsyZmYQ",
  authDomain: "estado-de-equipos-rtgs.firebaseapp.com",
  databaseURL: "https://estado-de-equipos-rtgs-default-rtdb.firebaseio.com",
  projectId: "estado-de-equipos-rtgs",
  storageBucket: "estado-de-equipos-rtgs.firebasestorage.app",
  messagingSenderId: "927929035915",
  appId: "1:927929035915:web:6d575b52c47d7014ac788e",
  measurementId: "G-SPQXSGR6P9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
```

